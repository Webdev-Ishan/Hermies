import express from "express";
const userRouter = express.Router();
import * as userController from "../Controller/user.controller.js";
import { postUser } from "../Middleware/user.middleware.js";
import upload from "../Middleware/multer.js";

userRouter.post(
  "/createPost",
  postUser,
  upload.single("image"),
  userController.createPost
);
userRouter.post("/deletePost", postUser, userController.deletePost);
export default userRouter;
