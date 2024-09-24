import db from '../db.js';

const User = {
    insertUser: async (data) => {
        const query = `
            insert into auth_users (first_name, last_name, email, password, username)
            VALUES ($/first_name/, $/last_name/, $/email/, $/password/, $/username/)
            RETURNING id, username;
        `;
        const  result = await db.one(query, data)
        console.log("models auth.js" , result)
        return result;
    },

    updateUser: async (data) => {
    const query = `
        UPDATE auth_users
        SET
            first_name = $/first_name/,
            last_name = $/last_name/,
            email = $/email/,
            username = $/username/
        WHERE id = $/id/
        RETURNING id, username;
    `;
        return db.one(query, data);
    },

    deleteUser: async (user_id) => {
    const query = `
        UPDATE auth_users
        SET
            state = 0
        WHERE id = $/id/;
    `;
        return db.one(query, data);
    },
    getUser: async (data) => {
        const query = `SELECT id, username, email, password, first_name, last_name
                       FROM auth_users
                       where email = $/email/
                         and state = 1 `
        let user = await db.oneOrNone(query, data)
        // console.log("db.one(query, data)", user)
        return user
    },
    findUser: async (username) => {
        const query = `SELECT id, username, concat(first_name, ' ', last_name) as full_name FROM auth_users WHERE username LIKE $1`;
        return db.any(query, [`%${username}%`]);
    }
};


export default User