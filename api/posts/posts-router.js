"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_model_1 = require("./posts-model");
const posts = express_1.Router();
const getPost = (id, res) => {
    posts_model_1.findById(id).then((post) => {
        if (!post) {
            res.status(404).json({ message: "does not exist" });
            return;
        }
        res.status(201).json(post);
    });
};
posts.get("/posts", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    posts_model_1.find().then((post) => {
        if (!post) {
            res
                .status(500)
                .json({ message: "The posts information could not be retrieved" });
            return;
        }
        res.status(200).json(post);
    });
}));
posts.get("/posts/:id", (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Unable to find post" });
    }
    getPost(Number(req.params.id), res);
});
posts.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    if (!newPost.contents || !newPost.title) {
        res.status(400).json({ error: "Missing Contents or Titles" });
        return;
    }
    posts_model_1.insert(newPost).then((value) => {
        if (!value.id) {
            res.status(500).json({ error: "Unable to add post" });
            return;
        }
        getPost(value.id, res);
    });
}));
posts.put("/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateInput = req.body;
    if (!updateInput.title || !updateInput.contents) {
        res.status(400).json({ message: "provide title and contents" });
        return;
    }
    posts_model_1.update(Number(req.params.id), updateInput).then((postId) => {
        getPost(postId, res);
    });
}));
posts.delete("/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    posts_model_1.findById(Number(req.params.id)).then((data) => {
        if (!data) {
            res.status(404).json({ message: "does not exist" });
            return;
        }
        posts_model_1.remove(Number(req.params.id)).then(() => {
            res.json(data);
        });
    });
}));
posts.get("/posts/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    posts_model_1.findPostComments(Number(req.params.id)).then((comments) => {
        if (comments.length === 0) {
            res.status(404).json({ message: "does not exist" });
            return;
        }
        res.status(201).json(comments);
    });
}));
exports.default = posts;
//# sourceMappingURL=posts-router.js.map