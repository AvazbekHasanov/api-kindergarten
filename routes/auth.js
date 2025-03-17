import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {createUser, updateUser, login, getJWTToken, findUserByUsername, changeState, sendSmsToEmail} from '../controllers/auth.js';
import {verifyBarerToken} from '../middleware/authMiddleware.js'
import User from "../models/User.js"; // Use relative path

dotenv.config();

const router = Router();


router.post("/api/auth/register" ,async (req, res) => {

    try {
        const result = await createUser(req); // No need to pass res here
        res.status(200).json({ message: "User created successfully", user: result });
    } catch (err) {
        const errorKey = !!err.message.match(/"([^"]*)"/) && err.message.match(/"([^"]*)"/).length > 1 ? err.message.match(/"([^"]*)"/)[1] : '';
        let typeError = ''
        if(errorKey === 'auth_users_email_key'){
            typeError = 'EMAIL_ADDRESS_ALREADY_EXISTS'
        }else if(errorKey === 'auth_users_username_key'){
            typeError = 'USERNAME_ADDRESS_ALREADY_EXISTS'
        }

        res.status(500).send({
            message: `Failed to create user: ${err.message}`,
            typeError: typeError
        });
    }
});

router.post("/api/auth/update", async (req, res) => {
    try {
        const result = await updateUser(req); // No need to pass res here
        res.status(201).json({ message: "User updated successfully", user: result });
    } catch (err) {
        res.status(500).send({ message: `Failed to update user: ${err.message}` });
    }
});


router.post("/api/send/sms/email", async (req, res) => {
    try {
        const result = await sendSmsToEmail(req); // No need to pass res here
        res.status(201).json({ message: "Sms was sent", info: result });
    } catch (err) {
        res.status(500).send({ message: `Failed to update user: ${err.message}` });
    }
});


router.post("/api/auth/login", async (req, res) => {
    if(!validateEmail(req.body.username)){
       res.status(400).json({
           message: "Email address required",
           typeError: 'EMAIL_ADDRESS_VALID_WRONG'
       });
       return
    }
    const result = await login(req)
    if(result && result.id){
        await bcrypt.compare(req.body.password, result.password, async (err, isMatch) => {
            if (isMatch) {
                delete result.password
                const token = await getJWTToken(result)
                res
                  .status(200)
                  .json({
                    message: "User login Successfully",
                    accessToken: token,
                    userData: result,
                  });

            } else {
                res.status(401).json({message: "Invalid Credentials", typeError: 'WRONG_PASSWORD'});
            }
        })
    }else {
        res.status(401).json({message: "User not found", typeError: 'USER_NOT_FOUND'});
    }
})

router.get('/api/find/user', async (req, res) => {
    let lookingUsername =  req.query.username;
    const result = await findUserByUsername(lookingUsername);
    res.status(200).json({result: result})
})

router.post(`/api/change/state`, async (req, res) => {
    try{
        console.log( "before call controller",req.body);
        const result = await changeState(req);
        console.log(result);
        res.status(200).json({message: 'Successfully changed state',  result: result});
    }catch(err){
        res.status(500).json({ message: `Failed to change state: ${err.message}` });
    }
})

function validateEmail(email) {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export default router;
