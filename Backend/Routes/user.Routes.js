import express from "express";
const userRouter = express.Router();
import * as userController from "../Controller/user.controller.js";
import { postUser } from "../Middleware/user.middleware.js";
import upload from "../Middleware/multer.js";
import { apply } from "../Middleware/application.middleware.js";
import { authUser } from "../Middleware/auth.midlleware.js";

userRouter.post(
  "/createPost",
  postUser,
  upload.single("image"),
  userController.createPost
);
userRouter.post("/deletePost/:id", postUser, userController.deletePost);
userRouter.get("/getPost/:id",userController.getPost)
userRouter.post("/apply/:id", apply, userController.apply);
userRouter.post("/cancel/:id", apply, userController.cancel);
userRouter.post("/accept/:id",userController.accept)
userRouter.post("/reject/:id",userController.reject)
userRouter.get("/getApplications/:id", userController.getApply);
userRouter.get("/allPosts", authUser, userController.getAll);
userRouter.get("/petinfo/:id",userController.petinfo);
export default userRouter;
