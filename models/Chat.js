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
    },
    checkChat: async (data) => {
        const query = `select chat_id
                       from participants
                       where user_id = $/user_id/
                         and chat_id in (select a.chat_id from participants a where a.user_id = $/current_user_id/ group by a.chat_id)
                         and state = 1
                       group by chat_id`
        try {
            let res = await db.oneOrNone(query, data)
            console.log(res)
            return res
        }catch(err) {
            throw new Error(err)}
    },
    ChatMessages: async (data) => {
        try {
        const query = `select m.id, m.content, m.files,
                              m.chat_id,
                              m.is_read,
                           case when au.first_name is not null then concat(au.first_name, ' ', au.last_name) else au.username end as "from",
                              case when sender_id = $/current_user_id/ then true else false end as is_owner,
                              to_char(sent_at, 'HH:MS')                                       as send_at
                       from messages m
                       left join auth_users au on au.id = m.sender_id 
                       where m.chat_id = $/chat_id/ order by sent_at`;
            return await db.any(query, data)
        }catch (er){
            throw new Error(er)
        }


    },
    getChatInfo: async (data)=>{
        try {
            const query = `select case
                                      when (concat(au.first_name, ' ', au.last_name)) = ' ' then username
                                      else (concat(au.first_name, ' ', au.last_name)) end as full_name,
                                  photo,
                                  $/chat_id/ as chat_id
                           from auth_users au
                           where id =  (select user_id from participants where chat_id = $/chat_id/ and user_id<>$/current_user_id/)
                             and state = 1`
            let res = db.one(query, data)
            return res
        } catch (er) {
            throw new Error(er)
        }

    },

    userChatList: async (data) =>{
        try {
            const query = `select case
                                      when ch.type = 'USER' then (case
                                                                      when (concat(au.first_name, ' ', au.last_name)) = ' '
                                                                          then username
                                                                      else (concat(au.first_name, ' ', au.last_name)) end)
                                      else ch.name end as full_name,
                                  au.photo,
                                  p.chat_id,
                                  m.content            as lastMessage,
                                  m.sent_at
                           from participants p
                                    left join chats ch on ch.id = p.chat_id and ch.state = 1
                                    left join participants pp
                                              on pp.chat_id = ch.id and pp.user_id <> $/current_user_id/ and pp.state = 1
                                    left join auth_users au on au.id = pp.user_id and au.state = 1
                                    left join lateral (select m.content,
                                                              to_char(m.sent_at, 'HH:MS') as sent_at,
                                                              sent_at                     as sent_at_time
                                                       from messages m
                                                       where ch.id = m.chat_id
                                                         and m.state = 1
                                                       order by m.sent_at desc limit 1) m
                           on true
                           where p.user_id = $/current_user_id/
                           order by m.sent_at_time`;
            return db.manyOrNone(query, data)
        }catch (e) {
            throw new Error(e.message);
        }
    }
}

export  default Message

