import { prisma } from "../prisma";
import { createPostSchema } from "./schemas/create-post.schema";
import { createPostCommentSchema } from "./schemas/create-post-comment.schema";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
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
      where: search
        ? {
            content: {
              contains: search,
            },
          }
        : undefined,
      orderBy: {
        created_at: orderBy,
      },
      take: limit,
      skip: offset,
    });

    const count = await prisma.posts.count();

    return {
      posts,
      count,
    };
  }

  async createPost(data: any) {
    await createPostSchema.parseAsync(data);
    const nextPost = await prisma.posts.create({
      data: {
        user_id: data.user_id,
        content: data.content,
      },
    });
    return nextPost;
  }

  async readPost(postId: number) {
    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async updatePost(postId: number, data: any) {
    const post = await prisma.posts.update({
      data: {
        content: data.content,
      },
      where: {
        id: postId,
      },
    });
    return post;
  }

  async deletePost(postId: number) {
    const post = await prisma.posts.delete({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async listPostComments(postId: number) {
    const comments = await prisma.comments.findMany({
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
      where: {
        post_id: postId,
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
        message: data.message,
        user_id: data.user_id,
        post_id: postId,
      },
    });
    return comment;
  }
}
