import { createUserSchema } from "./schemas/create-user.schema";
import { prisma } from "../prisma";

export class UserRepository {
  async createUser(data: any) {
    await createUserSchema.parseAsync(data);
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar,
        passwd: data.password,
      },
    });
    return user;
  }

  async readUser(userId: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async listUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async addFriend(userA: number, userB: number) {
    const friend = await prisma.friends.create({
      data: {
        user_a: userA,
        user_b: userB,
      },
    });
    return friend;
  }

  async listLatestFriends(userId: number) {
    const friends = await prisma.$queryRaw/* sql */ `
        select * from users where id in (
          select user_b
          from friends
          where user_a = ${userId}
          union
          select user_a
          from friends
          where user_b = ${userId}
        )
        order by created_at desc
        limit 9;`;
    return friends;
  }
}
