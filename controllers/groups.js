import Group from '../models/Groups.js';
import dotenv from 'dotenv';

dotenv.config();
export const createGroup = async (req) => {
    try {

        const data = {
            name: req.body.name ,
            org_id: req.body.org_id,
            description: req.body.description,
            group_head: req.body.group_head
        };

        return await Group.insertGroup(data);
    } catch (err) {
        throw new Error(err.message);
    }
}

export const deleteGroup = async (req) => {
    try {
        return await Group.deleteGroup(req.params.id);
    }catch (err) {
        throw new Error(err.message);
    }
}

export const getGroups = async (req) => {
    try {
        const response = await Group.getGroup()
        return response
    }catch (err) {
        throw new Error(err.message);
    }
}





export default {
    createGroup,
    deleteGroup,
    getGroups
};
