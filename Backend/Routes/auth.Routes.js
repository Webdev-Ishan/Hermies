import express from "express";
const authRouter = express.Router();
import * as authController from "../Controller/auth.controller.js";
import { authUser } from "../Middleware/auth.midlleware.js";
import multer from "../Middleware/multer.js";

authRouter.post("/register", multer.single("profilePicture"),authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/profile", authUser, authController.profile);
authRouter.post("/logout", authController.logout);
authRouter.get("/user/:id", authController.finduser);
export default authRouter;
