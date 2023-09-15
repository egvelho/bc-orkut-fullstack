import { createUserSchema } from "./schemas/create-user.schema.mjs";
import { db } from "../db.mjs";

export async function createUser(data) {
  await createUserSchema.parseAsync(data);
  const user = db
    .prepare(
      /* sql */
      `insert into users(
         first_name,
         last_name,
         avatar,
         passwd
       ) values(?, ?, ?, ?) returning *`
    )
    .get(data.first_name, data.last_name, data.avatar, data.password);
  return user;
}

export async function readUser(id) {
  const user = db.prepare(/* sql */ `select * from users where id=?`).get(id);
  return user;
}

export async function listUsers() {
  const users = db.prepare(/* sql */ `select * from users`).all();
  return users;
}
