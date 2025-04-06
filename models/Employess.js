import db from "../db.js";

const Emp = {
    insertEmp: async (data) => {
        const query = `
            insert into org_employees ( created_at , position_id, org_id, email, salary, degree, full_name)
            values (now(), $/position_id/, $/org_id/, $/email/, $/salary/, $/degree/, $/full_name/)
                returning id;`;
        const result = await db.one(query, data);
        console.log("models auth.js", result);
        return result;
    },

    deleteEmp: async (id) => {
        const query = `
        UPDATE org_employees
        SET
            state = 0
        WHERE id = $/id/ returning id;
    `;
        return db.one(query, {id:id});
    },
    getPosition: async (data) => {
        const query = `select id, name3 as name
                       from lists where type_id = 1`;
        let positions = await db.manyOrNone(query, data);
        console.log("db.one(query, data)", positions)
        return positions;
    },
    getEmp: async (data) => {
        const query = `select em.id, em.created_at, em.salary, coalesce(au.full_name,em.full_name) as full_name,
                              em.degree,  l.name3 as position_id
                       from org_employees em
                                left join auth_users au on em.email = au.email and au.state = 1
                                left join lists l on type_id = 1 and l.id = em.position_id
                       where em.state = 1 and em.org_id = $/org_id/;`;
        let groups = await db.manyOrNone(query, data);
        console.log("db.one(query, data)", groups)
        return groups;
    },
};

export default Emp;
