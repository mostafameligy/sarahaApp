import express from "express";
import { dbConnection } from "./DB/index.js";
import { env } from "../config/index.js";
import { glopalErrorHandling } from "./common/index.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/messages/message.controller.js";
import { client, redisConnect } from "./DB/redis.js";
import { get, set } from "./DB/redis.service.js";

export const bootstrap = async () => {
  const app = express();
  app.use(express.json());
   dbConnection();
  await redisConnect();

  app.use("/upload", express.static("upload"));
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/messages", messageRouter);

  app.use("{/*dummy}", (req, res) => {
    res.status(404).json({ message: "error in path ro methoud" });
  });

  app.use(glopalErrorHandling);
  app.listen(env.port, () => {
    console.log("server is running in port", env.port);
  });
};
