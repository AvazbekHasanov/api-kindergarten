import db from "../db.js";

const Children = {
    insertChildren: async (data) => {
        const query = `
                insert into org_children (created_at, full_name, org_id, age, group_id, gender, parent_name, parent_email)
                 values (now(), $/full_name/, $/org_id/, $/age/, $/group_id/, $/gender/, $/parent_name/, $/parent_email/)
                           returning id;`;
        const result = await db.one(query, data);
        console.log("models auth.js", result);
        return result;
    },

    deleteChildren: async (id) => {
        const query = `
        UPDATE org_children
        SET
            state = 0
        WHERE id = $/id/ returning id;
    `;
        return db.one(query, {id:id});
    },
    getChildren: async (data) => {
        const query = `select ch.id, ch.full_name, ch.age, ch.parent_name,
                              case when ch.gender = 1 then 'O''g''il' else 'Qiz' end as gender,
                              g.name as group_name,
                              au.full_name as organization_name,
                              au.photo as organization_photo
                       from org_children ch
                                left join auth_users au on au.id = ch.org_id and au.state = 1
                                left join org_groups g on g.id = ch.group_id and g.state = 1
                       where case when $/user_type/ = 'ORGANIZATION' then au.id = $/org_id/
                                  else ch.parent_email = $/parent_email/ end and ch.state = 1;`;
        let groups = await db.manyOrNone(query, data);
        console.log("db.one(query, data)", groups)
        return groups;
    },
};

export default Children;
