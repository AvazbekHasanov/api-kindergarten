import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import cors from "cors";
import os from "os";


dotenv.config(); // Ensure environment variables are loaded

const app = express();
const router = Router();

//ROUTES
import getAllUsers from './models/User.js';

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors());


const getLocalIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();

    for (let index in networkInterfaces) {
        for (let details of networkInterfaces[index]) {
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;  // Return the non-internal IPv4 address
            }
        }
    }

    return 'localhost';  // Fallback if no external IP is found
};
router.get("/", async (req, res) => {
  console.log("Salom", req.query.id);
  // const data =  await getAllUsers()
  // console.log("AuthRoutes.getAllUsers()",  data, data[0])
  res.send("Hello world");
});

app.use(router);
// app.use(AuthRoutes);

app.listen(PORT, () => {
    const ipAddress = getLocalIpAddress();
    console.log(`App listening at http://${ipAddress}:${PORT}`);
});
