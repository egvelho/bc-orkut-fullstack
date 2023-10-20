import { createUserSchema } from "./schemas/create-user.schema";
import { prisma } from "../prisma";
import { db } from "../db";

export class UserRepository {
  async createUser(data: any) {
    await createUserSchema.parseAsync(data);
    const user = await prisma.users.create({ data });
    return user;
  }

  async readUser(id: number) {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    return user;
  }

  async listUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async addFriend(user_a: number, user_b: number) {
    const friend = await prisma.friends.create({
      data: {
        user_a,
        user_b,
      },
    });
    return friend;
  }

  async listLatestFriends(userId: number) {
    const friends = db
      .prepare(
        /* sql */ `
        select * from users where id in (
          select user_b
          from friends
          where user_a = ?
          union
          select user_a
          from friends
          where user_b = ?
        )
        order by created_at desc
        limit 9;`
      )
      .all(userId, userId);
    return friends;
  }
}
