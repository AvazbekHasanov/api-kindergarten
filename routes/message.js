import {Router} from "express";
import {verifyBarerToken} from "../middleware/authMiddleware.js";
import {NewMessage} from '../controllers/Message.js'

const router = Router();

router.post('/api/message/new/message', verifyBarerToken, async (req, res) => {
    try {
        const result = await NewMessage(req)
        res.status(200).send({message: 'Message succes sent', data: result});
    }catch (e) {
         res.status(500).send({message: 'Error', error: e.message});
    }
})


export default router;