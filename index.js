import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";

// Load environment variables
dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = Router();
const server = createServer(app);

// Import your socket connection module
import { connectToSocket, sendEmitToUser } from "./controllers/socket.io.js";

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.text());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// Import Routes
import AuthRoutes from "./routes/auth.js";
import createChat from "./routes/chat.js";
import Messages from "./routes/message.js";
import FileUpload from "./routes/fileUpload.js";
import { checkImage } from "./AI.js";

app.use(router);
app.use(AuthRoutes);
app.use(createChat);
app.use(Messages);
app.use(FileUpload);

// Test routes
app.get("/:id?", async(req, res) => {
  res.cookie("test", "test 123");
  try {
    // Send message to specific user
    await sendEmitToUser(req.params.id, 'new-message', "Salom qanday");
    res.status(200).send(`Hello world. Your ID: ${req.params.id ? req.params.id : "none"}!`);
  } catch (err) {
    res.status(500).send(`Error sending message , ${err}`);
  }


  
});

app.get("/api/check-image", async (req, res) => {
  let res1 = await checkImage(req.query.image);
  res.status(200).json({ res: res1 });
});

// Start the Socket.IO connection
connectToSocket(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
