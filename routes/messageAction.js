import Router from 'express';
import {startConservation} from '../controllers/messageAction.js'


const router = Router();

router.get('/api/chat/start/conversation/:id?', async (req, res) => {
    try {
        const chatInfo = await startConservation({
            chat_id: req.params.id ?? '',
            user_id: req.query.user_id,
            current_user_id: req.query.current_user_id
        })
        console.log(chatInfo)
        res.send(`Hello World! ${req.params.id}, ${req.query.user_id}`);
    } catch (er) {
        res.status(500).json(er)
    }


})

export default router;