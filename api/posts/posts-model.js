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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertComment = exports.findCommentById = exports.findPostComments = exports.remove = exports.update = exports.insert = exports.findById = exports.find = void 0;
const db_config_1 = __importDefault(require("../../data/db-config"));
function find() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("posts");
    });
}
exports.find = find;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("posts")
            .where({ id: Number(id) })
            .first();
    });
}
exports.findById = findById;
function insert(post) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("posts")
            .insert(post, "id")
            .then((ids) => ({ id: ids[0] }));
    });
}
exports.insert = insert;
function update(id, post) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("posts").where("id", Number(id)).update(post);
    });
}
exports.update = update;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("posts").where("id", Number(id)).del();
    });
}
exports.remove = remove;
function findPostComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("comments")
            .join("posts", "posts.id", "post_id")
            .select("comments.*", "title as post")
            .where("post_id", postId);
    });
}
exports.findPostComments = findPostComments;
function findCommentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("comments")
            .join("posts", "posts.id", "post_id")
            .select("comments.*", "title as post")
            .where("comments.id", id)
            .first();
    });
}
exports.findCommentById = findCommentById;
function insertComment(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_config_1.default("comments")
            .insert(comment)
            .then((ids) => ({ id: ids[0] }));
    });
}
exports.insertComment = insertComment;
//# sourceMappingURL=posts-model.js.map