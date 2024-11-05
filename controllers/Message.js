import Message from "../models/Message.js";


export const NewMessage = async (data) => {
    try {
        const result = await Message.create({
            current_user_id: data.userInfo.id,
            message: data.body.message,
            files: JSON.stringify(data.body.files),
            chat_id: data.body.chat_id,
        });
        const message = await Message.info({current_user_id: data.userInfo.id, id: result.id});
        return message
    }catch(err) {
        throw new Error(err)
    }
}



export default {NewMessage}