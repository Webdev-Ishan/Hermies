import express from "express";
import * as messageController from "../Controller/message.controller.js";
import { authUser } from "../Middleware/auth.midlleware";
const messageRouter = express.Router();

messageRouter.get("/:chatroom", authUser, messageController.getMessages);

export default messageRouter;
