import db from "./db.js";

export const  runQuery = async (query, params = {}) => {
  try {
    return await db.any(query, params);
  } catch (error) {
    console.error('Error running query:', error);
    throw error;
  }
};

export default {runQuery};
