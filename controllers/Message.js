import Message from "../models/Message.js";
import Pusher from "pusher"


const pusher = new Pusher({
  appId: "1893691",
  key: "404a7728d9df124f4ade",
  secret: "f48e4c32fe457b87f9b4",
  cluster: "ap2",
  useTLS: true,
});

const getActiveChannels = async () => {
    try {
        const res = await pusher.get({ path: "/channels" });
        if (res.status === 200) {
          const body = await res.json();
          const channelsInfo = body.channels;
            console.log("channelsInfo", channelsInfo)
        }
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
};



export const NewMessage = async (data) => {
    try {
        await getActiveChannels();
        const result = await Message.create({
            current_user_id: data.userInfo.id,
            message: data.body.message,
            files: JSON.stringify(data.body.files),
            chat_id: data.body.chat_id,
        });
        const message = await Message.info({current_user_id: data.userInfo.id, id: result.id});
        await sendEventPusher(message);
        return message
    }catch(err) {
        throw new Error(err)
    }
}

async function sendEventPusher(data) {
  try {
    for (const element of data.members) {
        await pusher.trigger(`user_${element.user_id}`, 'new-chat-message', { data });
    }
  } catch (err) {
    console.error("Error sending message:", err);
    throw new Error(err.message)
  }
}

export async function MarkAsRead(req) {
    const data = {
        chat_id: req.body.chat_id,
        id: req.body.message_id,
        current_user_id: req.userInfo.id
    }
  try {
    const result = await Message.markAsRead(data);
    const sortedList = [...result].sort((a, b) => a.id - b.id);

      console.log("reversedList", sortedList, result)
    const notifyReadEvents = sortedList.map(message =>
      pusher.trigger(`user_${message.sender_id}`, "message-read",
          { message_id: message.id, chat_id: message.chat_id })
    );
  } catch (err) {
    throw new Error(err.message)
  }
}


export default { NewMessage, MarkAsRead };
