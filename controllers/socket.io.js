import {Server} from "socket.io";

export const connectToSocket = (server) => {


    const io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins or specify your frontend URL
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

// Socket.IO connection
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("sendMessage", (message) => {
            console.log("Received message: ", message);
            // Broadcast message to all connected clients
            io.emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}


export default {connectToSocket};
