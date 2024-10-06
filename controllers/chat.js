import CreateChat from "../models/Chat.js";
import err from "jsonwebtoken/lib/JsonWebTokenError.js";


export  const startConservation = async (params)=>{
    let chat_id = params.chat_id;
    if(!chat_id){
        const valid_chat_id = await checkingChatUser({user_id: params.user_id,current_user_id:  params.current_user_id});
        chat_id = valid_chat_id ? valid_chat_id : null
    }
    if(!chat_id){

        try {
            const result = await CreateChat.CreateChat()
            chat_id = result.id
        }catch(e){console.log(e.reponse)}
        const madeValue = `(${params.user_id}, ${chat_id}, now()), (${params.current_user_id}, ${chat_id}, now())`
        try {
            const addMemberResult = await CreateChat.AddMember(madeValue)
        }catch (er){
           throw new Error(er)
        }
        const chatInfo = await CreateChat.ChatInfo({user_id: params.user_id, chat_id: chat_id})
        return {chatInfo: chatInfo, messages: [] }
    }else {
        try {
             return {
                chatInfo: await CreateChat.getChatInfo({chat_id: chat_id, current_user_id: params.current_user_id}),
                messages: await CreateChat.ChatMessages({chat_id: chat_id, current_user_id: params.current_user_id}),
            }
        }catch (er){
            throw new Error(er);
        }
    }
}

export const userChatList = async (data)=>{
    try {
        return await CreateChat.userChatList(data)
    }catch (e) {
        throw new Error(e);
    }

}

async function  checkingChatUser  (params){
    try {
        const res = await CreateChat.checkChat(params)
        if(res && res.chat_id)
        return res.chat_id
        else return null
    }catch(e){
        throw new Error(e)
    }

}


export default {startConservation,userChatList}