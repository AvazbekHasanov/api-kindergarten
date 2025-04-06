import db from "../db.js";

const User = {
  insertUser: async (data) => {
    const query = `
      insert into auth_users ( created_at, full_name, permissions,
                               state, email, password, post_name, user_type, photo)
      values (now(), $/full_name/, to_jsonb(ARRAY['simple.user']), 1, $/email/, $/password/,
              $/post_name/, ($/user_type/)::auth_user_type, ($/photo/)::json)
        RETURNING id, email`;
    const result = await db.one(query, data);
    console.log("models auth.js", result);
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
    const query = `SELECT au.id,  au.email, au.password, au.full_name,
                          au.permissions, au.user_type,au.photo,
                          case when au.user_type = 'INDIVIDUAL'
                                 then json_build_object('org_name', auo.full_name,'photo', auo.photo)
                               else json_build_object('org_name', au.full_name,'photo', au.photo) end as org_info
                   FROM auth_users au
                          left join org_employees org on org.user_id = au.id and org.state = 1
                          left join auth_users auo on auo.id = org.org_id and auo.state = 1
                       where au.email = $/email/
                         and au.state = 1 `;
    let user = await db.oneOrNone(query, data);
    // console.log("db.one(query, data)", user)
    return user;
  },
  findUser: async (username) => {
    const query = ``;
    return db.any(query, [`%${username}%`]);
  },
  changeState: async (data) => {
    const query = `UPDATE auth_users
SET user_state= $/state/,
    last_seen = case when $/state/ = 'OFFLINE' then now() else last_seen end
WHERE id = $/user_id/ RETURNING id, user_state`;
    return db.one(query, data);
  },
};

export default User;
