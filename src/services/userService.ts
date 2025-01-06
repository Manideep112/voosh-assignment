import Index from "./index";
import { User } from "../models/user";
import { UserLogin } from "../models/userLogin";

class UserService extends Index {

    async findUser(condition) {
        try {
            return this.findOne(User, condition)
        } catch (err) {
            return false;
        }
    }

    async updateUser(data, condition) {
        try {
            return this.update(User, data, condition)
        } catch (err) {
            return false;
        }
    }

    async findAllUsers(condition) {
        try {
            return this.findAll(User, condition)
        } catch (err) {
            return false;
        }
    }

    async createUser(data) {
        try {
            return this.create(User, data)
        } catch (err) {
            console.log(err,'error in create user')
            return false;
        }
    }

    async createUserLogin(data) {
        try {
            return this.create(UserLogin, data)
        } catch (err) {
            console.log(err,'error in create user')
            return false;
        }
    }

    async findUserLogin(condition) {
        try {
            return this.findOne(UserLogin, condition)
        } catch (err) {
            return false;
        }
    }

    async updateUserLogin(condition, data) {
        try {
            return this.update(UserLogin, data, condition)
        } catch (err) {
            return false;
        }
    }
}

export const userService = new UserService()