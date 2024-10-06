import Router from 'express';
import { startConservation, userChatList } from '../controllers/chat.js';
import {verifyBarerToken} from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// const verifyToken = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ message: 'No token provided' });
//         }
//         req.userInfo = jwt.verify(token, process.env.JWT_SECRET);
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

router.get('/api/chat/start/conversation/:id?', verifyBarerToken, async (req, res) => {
    try {
        const chatInfo = await startConservation({
            chat_id: req.params.id || '',
            user_id: req.query.user_id,
            current_user_id: req.query.current_user_id || req.userInfo.id
        });

        res.status(200).json(chatInfo);
    } catch (error) {
        console.error('Error starting conversation:', error.message);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/api/user/chat/list', verifyBarerToken,async (req, res) => {
    try {
        const userId = req.userInfo.id || null;
        const chatLists = await userChatList({current_user_id: userId});
        res.status(200).json({chat_list: chatLists});
    } catch (err) {
        res.status(501).json({message: 'Internal server error',  error: err.message });
    }
});

export default router;
