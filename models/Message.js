import { Messages } from 'openai/resources/beta/threads/messages.mjs';
import db from '../db.js';

const Message = {
  create: async (data) => {
    try {
      const query = `insert into messages (chat_id, sender_id, content, files)
                           values ($/chat_id/, $/current_user_id/, $/message/,
                                   $/files/) RETURNING id, content, files, sender_id`;
      return await db.one(query, data);
    } catch (err) {
      throw new Error(err);
    }
  },
  info: async (data) => {
    try {
      const query = `select m.id, m.content,m.sender_id, m.files, m.chat_id, m.is_read,
                           (select json_agg(json_build_object('user_id', user_id)) from participants
                                                               where chat_id = m.chat_id
                                                               and user_id <> $/current_user_id/) as members,
                           case when au.first_name is not null then concat(au.first_name, ' ', au.last_name) else au.username end as "from",
                              case when sender_id = $/current_user_id/ then true else false end as is_owner,
                              to_char(sent_at, 'HH24:MI')                                       as send_at
                       from messages m
                       left join auth_users au on au.id = m.sender_id
                       where m.id = $/id/`;
      return await db.one(query, data);
    } catch (e) {
      throw new Error(e);
    }
  },
  markAsRead: async (message) =>{
    try {
      const query = `update messages
                     set is_read = true
                     where chat_id = $/chat_id/
                       and  sender_id <> $/current_user_id/
                       and is_read = false
                       and id <= $/id/ returning id, sender_id, chat_id`;
      const result =  await db.any(query, message);
      console.log("result", result)
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
};

export default Message;



