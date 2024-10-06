import User from '../models/User.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
export const createUser = async (req) => {
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        const data = {
            username: req.body.username,
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            password: hashPassword,
            email: req.body.email
        };

        return await User.insertUser(data);
    } catch (err) {
        throw new Error(err.message);
    }
}

export const updateUser = async (req) => {
    try {

        const data = {
            username: req.body.username,
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            id: req.body.id
        };

        return await User.updateUser(data);
    } catch (err) {
        throw new Error(err.message);
    }
}

export const login = async (req) => {
    try {
        const data = {email: req.body.username};
        let user = await User.getUser(data)
        if (user){
          return await User.getUser(data)
        }else {
            return  null
        }
    }catch (err) {
        // console.log("controller /auth.js", err)
        throw new Error(err.message);
    }

}

export const getJWTToken = async (obj) => {
    return jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: '1h'})

}

export const findUserByUsername =  async (param)=>{
    console.log("param", param)
    return  await User.findUser(param)
}

export default { createUser, updateUser, login , getJWTToken, findUserByUsername};
