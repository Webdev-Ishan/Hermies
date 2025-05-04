import express from "express";
const userRouter = express.Router();
import * as userController from "../Controller/user.controller.js";
import { postUser } from "../Middleware/user.middleware.js";
import upload from "../Middleware/multer.js";
import { apply } from "../Middleware/application.middleware.js";

userRouter.post(
  "/createPost",
  postUser,
  upload.single("image"),
  userController.createPost
);
userRouter.post("/deletePost/:id", postUser, userController.deletePost);
userRouter.post("/apply/:id", apply, userController.apply);
userRouter.post("/cancel/:id", apply, userController.cancel);
export default userRouter;
