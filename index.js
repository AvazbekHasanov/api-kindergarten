import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import cors from "cors";
import os from "os";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import {fileURLToPath} from 'url'

//Routes
import AuthRoutes from './routes/auth.js';
import MessagingRoutes from './routes/messageAction.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = Router();

// Set up middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(router);
app.use(AuthRoutes);
app.use(MessagingRoutes)



app.get("/:id?", (req, res) => {
    res.cookie('test', 'test 123');
    res.status(200).send(`Hello world. Your ID: ${req.params.id ? req.params.id : 'none'}`);
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
