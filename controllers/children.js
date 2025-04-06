import Children from '../models/Children.js'
import dotenv from 'dotenv';

dotenv.config();
export const createChildren = async (req) => {
    try {

        const data = {
            full_name: req.body.full_name,
            org_id: req.body.org_id,
            age: req.body.age,
            group_id: req.body.group_id,
            parent_name: req.body.parent_name,
            parent_email: req.body.parent_email,
            gender: req.body.gender
        };

        return await Children.insertChildren(data);
    } catch (err) {
        throw new Error(err.message);
    }
}

export const deleteChildren = async (req) => {
    try {
        return await Children.deleteChildren(req.params.id);
    }catch (err) {
        throw new Error(err.message);
    }
}

export const getChildren = async (req) => {
    try {
        const response = await Children.getChildren(
            {org_id: req.query.org_id,
                parent_email: req.query.parent_email,
                user_type: req.query.user_type,
            });
        return response
    }catch (err) {
        throw new Error(err.message);
    }
}







export default {
    createChildren, deleteChildren, getChildren
};
