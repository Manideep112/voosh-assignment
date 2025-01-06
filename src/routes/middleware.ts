import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import * as rsa from 'jsonwebtoken';
// import * as randToken from 'rand-token';
import { response } from '../utils/response';
import { userService } from '../services/userService';
// import { loginService } from '../services/loginService';

require('dotenv').config();

class Middleware {

    /**
      * Route not allowed
      * @param  {} req
      * @param  {} res
      */
    methodNotAllowed(req, res) {
        return response.send(req, res, null, 'Method Not Allowed', 405, null);
    }

    /**
     * @param data 
     */
    tokenCreation = (data) => {
        try {
            console.log({ data, descryption: 'tokenCreation: has started' });
            const privateKeypath = path.join(__dirname, '../templates/privateKey.pem');
            const privateKey = fs.readFileSync(privateKeypath, 'utf8');

            const accessTokenOptions = {
                algorithm: 'RS512',
                expiresIn: Number(process.env.TOKEN_EXPIRY)
            }

            const accessToken = jwt.sign(data, privateKey, accessTokenOptions)

            return { status: true, data: { token: accessToken } };
        } catch (err) {
            console.log({ data: err, descryption: "Exception in token Creation" });
            return { status: false, message: 'Error in creation token' };
        }
    }

    /**
     * Decoding the token
     * @param req 
     * @param res 
     */
    validateToken = async (req, res) => {
        try {
            console.log({ jsonObject: req.headers, description: 'validateToken: has started' });

            if (!req.headers.authorization)
                return { status: false, message: 'Please Provide Token details' };

            const token = req.headers.authorization.split(' ')[1];

            // If token is not there in the headers sending error
            if (!token) {
                return { status: false, message: 'Please Provide Token details' };
            }

            const secretKeyPath = path.join(__dirname + '/../templates/publicKey.pem');
            const secretKey = fs.readFileSync(secretKeyPath, 'utf8');

            // verifying the token with the publicKey
            const verified = rsa.verify(token, secretKey, { algorithms: ['RS512'] });
            console.log({ jsonObject: verified, description: 'Decrypted token Data' });

            if (verified && Object.keys(verified).length > 0) {

                const findToken = {
                    where:{
                        user_id : verified.user_id,
                        token,
                        status : 1
                    },
                    raw: true
                };

                const findTokenInfo = await userService.findUserLogin(findToken);

                if (!(findTokenInfo && Object.keys(findTokenInfo).length))
                    return { status: false, message: 'Unauthorized Access' };

                req.email = verified.email;
                req.user_id = verified.user_id;
                req.role = verified.role;
                return { req, status: true };
            }


            return { status: false, message: 'Unauthorized Access' };
        } catch (err) {
            console.log({ err, message: "exception in validate token catch block" });
            return { status: false, message: 'Unauthorized Access' };
        }
    }

}

export const middleware = new Middleware()
