// implement your posts router here
import { Router, Request, Response } from "express";
import {
  NewPost,
  find,
  insert,
  findById,
  update,
  remove,
  findCommentById,
  findPostComments,
} from "./posts-model";

const posts = Router();

const getPost = (id: number, res: Response) => {
  findById(id).then((post) => {
    if (!post) {
      res.status(404).json({ message: "does not exist" });
      return;
    }
    res.status(201).json(post);
  });
};

// Get Request

posts.get("/posts", async (_: Request, res: Response) => {
  find().then((post) => {
    if (!post) {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
      return;
    }
    res.status(200).json(post);
  });
});

posts.get("/posts/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Unable to find post" });
  }
  getPost(Number(req.params.id), res);
});

// POST Request

posts.post("/posts", async (req: Request, res: Response) => {
  const newPost: NewPost = req.body;
  if (!newPost.contents || !newPost.title) {
    res.status(400).json({ error: "Missing Contents or Titles" });
    return;
  }
  insert(newPost).then((value: { id: number }) => {
    if (!value.id) {
      res.status(500).json({ error: "Unable to add post" });
      return;
    }
    getPost(value.id, res);
  });
});

// PUT Request

posts.put("/posts/:id", async (req: Request, res: Response) => {
  const updateInput: NewPost = req.body;
  if (!updateInput.title || !updateInput.contents) {
    res.status(400).json({ message: "provide title and contents" });
    return;
  }
  update(Number(req.params.id), updateInput).then((postId) => {
    getPost(postId, res);
  });
});

// DELETE Request

posts.delete("/posts/:id", async (req: Request, res: Response) => {
  findById(Number(req.params.id)).then((data) => {
    if (!data) {
      res.status(404).json({ message: "does not exist" });
      return;
    }
    remove(Number(req.params.id)).then(() => {
      res.json(data);
    });
  });
});

// Comments

posts.get("/posts/:id/comments", async (req: Request, res: Response) => {
  findPostComments(Number(req.params.id)).then((comments) => {
    if (comments.length === 0) {
      res.status(404).json({ message: "does not exist" });
      return;
    }
    res.status(201).json(comments);
  });
});

export default posts;
