import db from "../db.js";

const Group = {
    insertGroup: async (data) => {
        const query = `
            insert into org_groups (created_at, name, org_id, description, group_head)
            values (now(), $/name/, $/org_id/, $/description/, $/group_head/)
            returning id;`;
        const result = await db.one(query, data);
        console.log("models auth.js", result);
        return result;
    },

    deleteGroup: async (id) => {
        const query = `
        UPDATE org_groups
        SET
            state = 0
        WHERE id = $/id/ returning id;
    `;
        return db.one(query, {id:id});
    },
    getGroup: async (data) => {
        const query = `select org.*, au.full_name as head_name
                       from org_groups org
                                left join auth_users au on au.id = org.group_head
                       where org.state = 1;`;
        let groups = await db.manyOrNone(query, data);
        console.log("db.one(query, data)", groups)
        return groups;
    },
};

export default Group;
