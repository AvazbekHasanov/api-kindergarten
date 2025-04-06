import Emp from '../models/Employess.js';
import dotenv from 'dotenv';

dotenv.config();
export const createEmp = async (req) => {
    try {

        const data = {
            full_name: req.body.full_name,
            org_id: req.body.org_id,
            description: req.body.description,
            group_head: req.body.group_head,
            position_id: req.body.position_id,
            email: req.body.email,
            salary: req.body.salary,
            degree: req.body.degree,
        };

        return await Emp.insertEmp(data);
    } catch (err) {
        throw new Error(err.message);
    }
}

export const deleteEmp = async (req) => {
    try {
        return await Emp.deleteEmp(req.params.id);
    }catch (err) {
        throw new Error(err.message);
    }
}

export const getEmps = async (req) => {
    try {
        const response = await Emp.getEmp({org_id: req.query.org_id});
        return response
    }catch (err) {
        throw new Error(err.message);
    }
}

export const getPosition = async (req) => {
    try {
        const response = await Emp.getPosition();
        return response
    }catch (err) {
        throw new Error(err.message);
    }
}





export default {
    createEmp,
    deleteEmp,
    getEmps,
    getPosition
};
