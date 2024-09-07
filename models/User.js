import db from '../db.js';

export const getAllUsers = async () => {
    try {
      return db.one('SELECT * FROM users limit 1');
    }catch(err) {
        return err
    }
};

export default getAllUsers