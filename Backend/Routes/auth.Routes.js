import express from "express";
const authRouter = express.Router();
import * as authController from "../Controller/auth.controller.js";
import { authUser } from "../Middleware/auth.midlleware.js";

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/profile", authUser, authController.profile);
authRouter.post("/logout", authController.logout);
export default authRouter;
