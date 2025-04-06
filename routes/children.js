import { Router } from "express";
import dotenv from "dotenv";

import {createChildren, deleteChildren, getChildren} from "../controllers/children.js";

dotenv.config();

const router = Router();

router.post("/api/children/create", async (req, res) => {
   try {
       const result = await createChildren(req);
       res.status(200).send(result);
   }catch(err) {
       res.status(400).send({
           message: err.message
       })
   }
})

router.get('/api/children', async (req, res) => {
    const result = await getChildren(req);
    res.status(200).json({result: result})
})

router.delete('/api/children/delete/:id', async (req, res) => {
    console.log("req", req)
    const result = await deleteChildren(req);
    res.status(200).json({result: result})
})



export default router;
