import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Router } from "express";
import cors from "cors";

dotenv.config(); // Ensure environment variables are loaded

const app = express();
const router = Router();

//ROUTES
import AuthRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

// Connect to the database
const connectDB = () => {
  const url = process.env.DATABASEURL;

  try {
    mongoose.connect(url, {});
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
};

//  database connection
connectDB();


router.get("/", (req, res) => {
  console.log("Salom" , req.query.id);
  res.send("Hello world");
});

app.use(router);
app.use(AuthRoutes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
