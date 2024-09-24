import db from '../db.js';


const Message = {
    CreateChat: async (chatInfo) => {
        const query = `insert into chats (created_at, type)
                       values (now(), 'USER') RETURNING id`
        try {
          return await db.one(query);
        }catch (er){
            return er
        }

    },
    AddMember: async (data) => {
        const query = `insert into participants(user_id, chat_id, joined_at)
                       values ${data}`
        try {
          return await db.manyOrNone(query);
        }catch(err) {
            return err
        }
    },
    ChatInfo: async (data) => {
        const query = `select concat(au.first_name, ' ', au.last_name) as chat_name,
                              ch.id                                    as chat_id,
                              au.photo                                 as accaunt_photo
                       from chats ch
                                left join auth_users au on au.id = $/user_id/ and au.state = 1
                       where ch.id = $/chat_id/`
        try {
            return await db.one(query, data)
        }catch(err) {return err}
    }
    checkChat: async (data) => {
        const query = ``
    }
}

export  default Message

