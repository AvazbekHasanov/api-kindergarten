import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import path from "path";
import fs from "fs";
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


// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.text());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());


app.get("/file/:id", (req, res) => {
  const baseFileName = req.params.id;
  const ext = req.query.ext || '.svg';

  const filePathWithoutExt = path.join(__dirname, "uploads", baseFileName);

  const extensionMimeMap = {
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    // Add other extensions as needed
  };

  fs.exists(filePathWithoutExt, (existsWithoutExt) => {
    console.log("exists without EXT:", existsWithoutExt);

    if (existsWithoutExt) {
      // If file exists, set the MIME type based on the known extension
      const mimeType = extensionMimeMap[ext] || 'application/octet-stream'; // Get MIME type for the extension
      res.setHeader('Content-Type', mimeType); // Set MIME type
      return res.sendFile(filePathWithoutExt); // Serve the file with the extension
    } else {
      // If the file doesn't exist, send a 404 response
      return res.status(404).send('File not found');
    }
  });
});


// Import Routes
import AuthRoutes from "./routes/auth.js";
import UploadFiles from "./routes/fileUpload.js"
import Groups from "./routes/groups.js";
import Employees from "./routes/Employees.js";
import Children from "./routes/children.js";

app.use(router);
app.use(AuthRoutes);
app.use(UploadFiles);
app.use(Groups)
app.use(Employees)
app.use(Children)


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


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
