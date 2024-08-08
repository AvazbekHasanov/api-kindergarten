import { Router } from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import User from "../models/User.js";

import bcrypt from "bcrypt";

dotenv.config();

const router = Router();

const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER, // your email address
    pass: process.env.GMAIL_APP_PASSWORD, // your app password
  },
};

let message = {
  from: process.env.GMAIL_APP_USER,
  to: "avazbekxasanov200@gmail.com",
  subject: "Welcome to ABC Website!",
  html: "<b>Hello world?</b>",
};

const transporter = nodemailer.createTransport(emailConfig);

router.post("/auth/services/register", async (req, res) => {
  const saltRounds = 10;
  let hashPassword = ''
  await bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      hashPassword = hash;
      console.log(hash)
    })
    .catch((err) => {
      res.send(JSON.status(401).stringify({ msg: err.message }));
    });
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    username: req.body.username
  };
  try {
    const user = await User.create(userData);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error on creating user", error: err.message });
  }
});

export default router