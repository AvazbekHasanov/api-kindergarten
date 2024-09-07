import express from "express";
import dotenv from "dotenv";
import { Router } from "express";
import cors from "cors";


dotenv.config(); // Ensure environment variables are loaded

const app = express();
const router = Router();

//ROUTES
import getAllUsers from './models/User.js';

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors());



router.get("/", async (req, res) => {
  console.log("Salom", req.query.id);
  const data =  await getAllUsers()
  console.log("AuthRoutes.getAllUsers()",  data, data[0])
  res.send("Hello world");
});

app.use(router);
// app.use(AuthRoutes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
