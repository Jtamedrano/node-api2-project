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
posts.get("/posts", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    posts_model_1.find().then((post) => {
        if (!post) {
            res.status(500).json({ error: "Unable to find post" });
            return;
        }
        res.status(200).json({ post });
    });
}));
posts.get("/posts/:id", (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Unable to find post" });
    }
    posts_model_1.findById(Number(req.params.id)).then((post) => {
        if (!post) {
            res.status(500).json({ error: "Unable to find post" });
            return;
        }
        res.status(200).json({ post });
    });
});
posts.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    if (!newPost.contents || !newPost.title) {
        res.status(400).json({ error: "Missing Contents or Titles" });
        return;
    }
    posts_model_1.insert(newPost).then((post) => {
        if (!post) {
            res.status(500).json({ error: "Unable to add post" });
            return;
        }
        res.status(201).json({
            post,
        });
    });
}));
exports.default = posts;
//# sourceMappingURL=posts-router.js.map