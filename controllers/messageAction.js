import MessageAction from "../models/messageAction.js";
import result from "jsonwebtoken/lib/JsonWebTokenError.js";


export  const startConservation = async (params)=>{
    let chat_id = params.chat_id;
    if(!chat_id){
        try {
            const result = await MessageAction.CreateChat()
            chat_id = result.id
        }catch(e){console.log(e.reponse)}
        const madeValue = `(${params.user_id}, ${chat_id}, now()), (${params.current_user_id}, ${chat_id}, now())`
        try {
            const addMemberResult = await MessageAction.AddMember(madeValue)
        }catch (er){
            return er
        }
        const chatInfo = await MessageAction.ChatInfo({user_id: params.user_id, chat_id: chat_id})
        return {chatInfo: chatInfo, messages: [] }
    }
}

async function  checkingChatUser  (params){
    const res = await MessageAction.checkChat
}


export default {startConservation}