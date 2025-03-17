import { Server } from 'socket.io';

let io;

// Initialize the socket.io connection
export const connectToSocket = (server) => {
  io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    
    // Save the socket.id and userId to the database when the user connects
    const userId = socket.handshake.query.userId; // Get user ID from the query parameter
    if (userId) {
      
          console.log(`User ${userId} connected and socket_id saved: ${socket.id}`);

    }

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected`);
            console.log(`User ${userId} socket ID removed from database`);

    });
  });
};

export const sendEmitToUser = async (userId, event, data) => {
      io.to(userId).emit(event, data);
};
