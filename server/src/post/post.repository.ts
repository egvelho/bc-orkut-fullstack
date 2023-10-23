import { prisma } from "../prisma";
import { createPostSchema } from "./schemas/create-post.schema";
import { createPostCommentSchema } from "./schemas/create-post-comment.schema";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
    const whereSearch = search ? `where content like '%${search}%'` : "";
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        content: true,
        created_at: true,
        user_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: orderBy,
      },
      where: search
        ? {
            content: {
              contains: search,
            },
          }
        : undefined,
      take: limit,
      skip: offset,
    });

    const count = await prisma.posts.count();
    // @ts-ignore
    return {
      posts,
      count,
    };
  }

  async createPost(data: any) {
    await createPostSchema.parseAsync(data);
    const nextPost = await prisma.posts.create({
      data,
    });
    return nextPost;
  }

  async readPost(id: number) {
    const post = await prisma.posts.findFirst({
      where: {
        id,
      },
    });
    return post;
  }

  async updatePost(id: number, data: any) {
    const post = await prisma.posts.update({
      where: {
        id,
      },
      data,
    });
    return post;
  }

  async deletePost(id: number) {
    const post = await prisma.posts.delete({
      where: {
        id,
      },
    });
    return post;
  }

  async listPostComments(postId: number) {
    const comments = await prisma.comments.findMany({
      where: {
        post_id: postId,
      },
      select: {
        id: true,
        message: true,
        created_at: true,
        user_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return comments;
  }

  async createPostComment(postId: number, data: any) {
    await createPostCommentSchema.parseAsync(data);
    const comment = await prisma.comments.create({
      data: {
        ...data,
        post_id: postId,
      },
    });
    return comment;
  }
}
