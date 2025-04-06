import { Router } from "express";
import dotenv from "dotenv";

import {createGroup, deleteGroup, getGroups} from "../controllers/groups.js";
import {getPosition} from "../controllers/employees.js";

dotenv.config();

const router = Router();

router.post("/api/groups/create", async (req, res) => {
   try {
       const result = await createGroup(req);
       res.status(200).send(result);
   }catch(err) {
       res.status(400).send({
           message: err.message
       })
   }
})

router.get('/api/groups', async (req, res) => {
    const result = await getGroups();
    res.status(200).json({result: result})
})

router.delete('/api/groups/delete/:id', async (req, res) => {
    console.log("req", req)
    const result = await deleteGroup(req);
    res.status(200).json({result: result})
})

router.get('/api/positions', async (req, res) => {
    try {
        let result = await getPosition(req)
        res.status(200).json({result: result})
    }catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})



export default router;
