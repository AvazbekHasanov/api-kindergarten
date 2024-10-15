import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Routes
import AuthRoutes from './routes/auth.js';
import createChat from "./routes/chat.js";
import Messages from './routes/message.js'
import FileUpload from "./routes/fileUpload.js";

import {checkImage} from "./AI.js";

dotenv.config();


const app = express();
const router = Router();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Set up middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(router);
app.use(AuthRoutes);
app.use(createChat);
app.use(Messages);
app.use(FileUpload);





app.get("/:id?", (req, res) => {
    // const userFolder = os.hostname()
    res.cookie('test', 'test 123');
    res.status(200).send(`Hello world. Your ID: ${req.params.id ? req.params.id : 'none'}! `);
});

app.get("/api/check-image", async (req, res) => {
    let res1 =  await checkImage(req.query.image)
    res.status(200).json({res: res1})
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
