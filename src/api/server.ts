import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import posts from "./posts/posts-router";

const server = express();

const logger = (req: Request, _: Response, next: () => any) => {
  console.log(`[${req.method}] - ${req.path}`);
  next();
};

server.use(logger);
server.use(cors());
server.use(bodyParser.json());
server.use("/api", posts);

export default server;
