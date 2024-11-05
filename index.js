import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";


// socket.io
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = Router();
const server = createServer(app);
// Set up middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());




// Import Routes
import AuthRoutes from './routes/auth.js';
import createChat from './routes/chat.js';
import Messages from './routes/message.js';
import FileUpload from './routes/fileUpload.js';

import { checkImage } from './AI.js';
import {createServer} from "http";
import {connectToSocket} from "./controllers/socket.io.js";

app.use(router);
app.use(AuthRoutes);
app.use(createChat);
app.use(Messages);
app.use(FileUpload);

app.get("/:id?", (req, res) => {
  res.cookie('test', 'test 123');
  res.status(200).send(`Hello world. Your ID: ${req.params.id ? req.params.id : 'none'}!`);
});

app.get("/api/check-image", async (req, res) => {
  let res1 = await checkImage(req.query.image);
  res.status(200).json({ res: res1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
connectToSocket(server)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
