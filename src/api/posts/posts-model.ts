import db from "../../data/db-config";

export interface Post {
  id: number;
  title: string;
  contents: string;
}
export interface NewPost {
  title: string;
  contents: string;
}

export interface Comment {
  id: number;
  text: string;
  post_id: number;
}

export interface NewComment {
  text: string;
  post_id: number;
}

export async function find(): Promise<Post[]> {
  return await db("posts");
}

export async function findById(id: number): Promise<Post> {
  return await db("posts")
    .where({ id: Number(id) })
    .first();
}

export async function insert(post: NewPost): Promise<Partial<Post>> {
  return await db("posts")
    .insert(post, "id")
    .then((ids) => ({ id: ids[0] }));
}

export async function update(id: number, post: Partial<Post>): Promise<Post> {
  return await db("posts").where("id", Number(id)).update(post);
}

export async function remove(id: number) {
  return await db("posts").where("id", Number(id)).del();
}

export async function findPostComments(
  postId: number
): Promise<Partial<Comment[]>> {
  return await db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("post_id", postId);
}

export async function findCommentById(id: number): Promise<Partial<Comment>> {
  return await db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("comments.id", id)
    .first();
}

export async function insertComment(
  comment: NewComment
): Promise<Partial<Comment>> {
  return await db("comments")
    .insert(comment)
    .then((ids) => ({ id: ids[0] }));
}
