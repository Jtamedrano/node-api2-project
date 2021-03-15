"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_router_1 = __importDefault(require("./posts/posts-router"));
const server = express_1.default();
const logger = (req, _, next) => {
    console.log(`[${req.method}] - ${req.path}`);
    next();
};
server.use(logger);
server.use(cors_1.default());
server.use(body_parser_1.default.json());
server.use("/api", posts_router_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map