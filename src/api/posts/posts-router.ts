// implement your posts router here
import { Router, Request, Response } from "express";
import { NewPost, find, insert, findById } from "./posts-model";

const posts = Router();

// Get Request

posts.get("/posts", async (_: Request, res: Response) => {
  find().then((post) => {
    if (!post) {
      res.status(500).json({ error: "Unable to find post" });
      return;
    }
    res.status(200).json({ post });
  });
});

posts.get("/posts/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Unable to find post" });
  }
  findById(Number(req.params.id)).then((post) => {
    if (!post) {
      res.status(500).json({ error: "Unable to find post" });
      return;
    }
    res.status(200).json({ post });
  });
});

// POST Request

posts.post("/posts", async (req: Request, res: Response) => {
  const newPost: NewPost = req.body;
  if (!newPost.contents || !newPost.title) {
    res.status(400).json({ error: "Missing Contents or Titles" });
    return;
  }
  insert(newPost).then((post) => {
    if (!post) {
      res.status(500).json({ error: "Unable to add post" });
      return;
    }
    res.status(201).json({
      post,
    });
  });
});

export default posts;
