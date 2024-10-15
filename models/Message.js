import db from '../db.js';

const Message = {
    create: async (data)=>{
        try {
            const query = `insert into messages (chat_id, sender_id, content, files)
                           values ($/chat_id/, $/current_user_id/, $/message/,
                                   '[]'::json) RETURNING id, content, files, sender_id`;
            return await db.one(query, data);
        }catch(err){
            return err
        }
    },
    info: async (data) => {
        try {
            const query = `select m.content,m.sender_id,
                           case when au.first_name is not null then concat(au.first_name, ' ', au.last_name) else au.username end as "from",
                              case when sender_id = $/current_user_id/ then true else false end as is_owner,
                              to_char(sent_at, 'HH:MS')                                       as send_at
                       from messages m
                       left join auth_users au on au.id = m.sender_id
                       where m.id = $/id/`
            return await db.one(query, data)
        }catch (e) {
            throw new Error(e)
        }
    }
}

export default Message;