import { Router } from "express";
import dotenv from "dotenv";

import {createEmp, deleteEmp, getEmps} from "../controllers/employees.js";

dotenv.config();

const router = Router();

router.post("/api/emp/create", async (req, res) => {
   try {
       const result = await createEmp(req);
       res.status(200).send(result);
   }catch(err) {
       res.status(400).send({
           message: err.message
       })
   }
})

router.get('/api/emp', async (req, res) => {
    const result = await getEmps(req);
    res.status(200).json({result: result})
})

router.delete('/api/emp/delete/:id', async (req, res) => {
    console.log("req", req)
    const result = await deleteEmp(req);
    res.status(200).json({result: result})
})



export default router;
