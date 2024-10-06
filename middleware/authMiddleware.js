import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyBarerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(401).send('Invalid token 1'); // Return a message with the status
        }
        req.userInfo = user; // Assign the decoded user info to req.userInfo
        next();
    });
};


export default{ verifyBarerToken };





