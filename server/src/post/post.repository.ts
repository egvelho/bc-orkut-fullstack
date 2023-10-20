import { db } from "../db";
import { prisma } from "../prisma";
import { createPostSchema } from "./schemas/create-post.schema";
import { createPostCommentSchema } from "./schemas/create-post-comment.schema";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
    const whereSearch = search ? `where content like '%${search}%'` : "";
    const posts = db
      .prepare(
        /* sql */ `
      select
        posts.id,
        posts.content,
        posts.created_at,
        posts.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name,
        users.avatar as user_avatar
      from posts join users on posts.user_id = users.id
      ${whereSearch}
      order by posts.created_at ${orderBy} limit ? offset ?`
      )
      .all(limit, offset);

    // @ts-ignore
    const { posts_count: count } = db
      .prepare(/* sql */ `select count(id) as posts_count from posts`)
      .get();

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
    const comments = db
      .prepare(
        /* sql */
        `select
          comments.id,
          comments.message,
          comments.created_at,
          comments.user_id,
          users.first_name as user_first_name,
          users.last_name as user_last_name,
          users.avatar as user_avatar
         from comments join users on comments.user_id = users.id
         where post_id=?
         order by comments.created_at desc`
      )
      .all(postId);

    return comments;
  }

  async createPostComment(postId: number, data: any) {
    await createPostCommentSchema.parseAsync(data);
    const comment = db
      .prepare(
        /* sql */ `
      insert into comments (message, post_id, user_id)
      values (?, ?, ?) returning *
    `
      )
      .get(data.message, postId, data.user_id);
    return comment;
  }
}
