import { response } from '../utils/response';
import * as bcrypt from 'bcrypt';
import { userService } from '../services/userService';
import { v4 as uuidv4 } from 'uuid';
import { middleware } from '../routes/middleware';

class UserController {

    /**
     * 
     * @param req 
     * @param res 
     */
    async signup(req, res) {
        try {
            console.log({ descryption: 'signUpUser: create User has started' });

            const payload = req.body;

            const where: any = {
                role: 'ADMIN',
                status: 1
            }
            const condition = {
                where,
                raw: true
            }
            const adminUserExist = await userService.findUser(condition);
            console.log(adminUserExist, 'Admin User Found')

            if (adminUserExist && Object.keys(adminUserExist).length && !payload.role)
                return response.send(req, res, null, 'Bad Request', 400, null);

            if ((payload.role && (req.role !== 'Admin')) || payload.role === 'Admin')
                return response.send(req, res, null, 'Forbidden Access/Operation not allowed', 403, null);

            delete where['role'];
            where.email = payload.email;

            const emailExist = await userService.findUser(condition);
            console.log(emailExist, 'Email Exist');

            if (emailExist && Object.keys(emailExist).length)
                return response.send(req, res, null, 'Email already exists.', 409, null);

            const password = payload.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_KEY));

            const saveUserData: any = {
                user_id: uuidv4(),
                email: payload.email,
                password: hashedPassword,
            };

            if (payload.role)
                saveUserData.role = payload.role;

            if (!adminUserExist)
                saveUserData.role = 'Admin';

            const createdUser = await userService.createUser(saveUserData);
            console.log(createdUser, 'createdUser data');

            if (!(createdUser && Object.keys(createdUser).length))
                return response.send(req, res, null, 'Failed in creating user.', 400, null);

            return response.send(req, res, null, 'User created successfully.', 201, null);
        } catch (err) {
            console.error('Exception in User controller', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async login(req, res) {
        try {
            console.log({ descryption: 'login: login User has started' });
            const payload = req.body;

            const condition = {
                where: {
                    email: payload.email,
                    status: 1
                },
                raw: true
            };

            const userData: any = await userService.findUser(condition);
            console.log(userData, 'User Info');

            if (!(userData && Object.keys(userData).length))
                return response.send(req, res, null, 'User not found.', 404, null);

            const isValidPassword = await bcrypt.compare(payload.password, userData.password,);

            if (!isValidPassword)
                return response.send(req, res, null, 'Invalid password.', 400, null);

            const tokenInfo = await middleware.tokenCreation({
                user_id: userData.user_id,
                email: userData.email,
                role: userData.role
            })

            if (!tokenInfo.status)
                return response.send(req, res, null, 'Failed in creating token.', 400, null);

            const data = {
                user_id : userData.user_id,
                token : tokenInfo.data?.token,
                status : 1
            };

            await userService.createUserLogin(data);
            return response.send(req, res, tokenInfo.data, 'Login successful.', 200, null);
        } catch (err) {
            console.error('Exception in User controller Login', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async userList(req, res) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const where: any = {
                status: 1
            };

            if (req.query.role)
                where.role = req.query.role;

            const condition = {
                attributes: ['user_id', 'email', 'role', 'created_at'],
                where,
                limit,
                offset,
                raw: true
            };

            const userList = await userService.findAllUsers(condition);
            console.log(userList, 'User List');

            response.send(req, res, userList, 'Users retrieved successfully.', 200, null);
        } catch (err) {
            console.error('Exception in User controller :userList', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async deleteUser(req, res) {
        try {
            if (req.role !== 'Admin')
                return response.send(req, res, null, 'Forbidden Access', 403, null);

            const condition = {
                where: {
                    user_id: req.params.user_id,
                    status: 1
                },
                raw: true
            };

            const userInfo = await userService.findUser(condition);
            console.log(userInfo, 'UserData');

            if (!(userInfo && Object.keys(userInfo).length))
                return response.send(req, res, null, 'User not found.', 404, null);
            
            const updatedUser = await userService.updateUser({ status: 0 }, condition);
            console.log(updatedUser,'Updated User Response');

            if (!(updatedUser && updatedUser[0] > 0))
                return response.send(req, res, null, 'Operation failed.', 500, null);

            return response.send(req, res, null, 'User deleted successfully.', 200, null);
        } catch (err) {
            console.error('Exception in User controller :deleteUser', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async changePassword(req, res) {
        try {
            const payload = req.body;
            const condition = {
                where: {
                    user_id: req.user_id,
                    status: 1
                },
                raw: true
            };

            const userInfo: any = await userService.findUser(condition);
            console.log(userInfo, 'UserData');

            if (!(userInfo && Object.keys(userInfo).length))
                return response.send(req, res, null, 'User not found.', 404, null);
            
            const isValidPassword = await bcrypt.compare(payload.old_password, userInfo.password);

            if(!isValidPassword)
                return response.send(req, res, null, 'Forbidden Access', 403, null);

            const updatedPassword = await bcrypt.hash(payload.new_password, Number(process.env.SALT_KEY));

            const updatedUser = await userService.updateUser({ password: updatedPassword }, condition);
            console.log(updatedUser, 'Updated User Response');

            if (!(updatedUser && updatedUser[0] > 0))
                return response.send(req, res, null, 'Operation failed.', 500, null);

            return response.send(req, res, null, 'Password updated successfully.', 204, null);
        } catch (err) {
            console.error('Exception in User controller :deleteUser', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async logout(req, res) {
        try {
            console.log({ descryption: 'logout: logout User has started' });
            const condition = {
                where: {
                    user_id: req.user_id,
                    status: 1
                },
                raw: true
            };

            const userData: any = await userService.findUser(condition);
            console.log(userData, 'User Info');

            if (!(userData && Object.keys(userData).length))
                return response.send(req, res, null, 'User not found.', 404, null)

            await userService.updateUserLogin(condition, {
                status : 0,
            });
            return response.send(req, res, null, 'User logged out successfully.', 200, null);
        } catch (err) {
            console.error('Exception in User controller logout', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }
}

export const userController = new UserController()