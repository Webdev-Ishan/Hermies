import express from "express";
import * as messageController from "../Controller/message.controller.js";
import { authUser } from "../Middleware/auth.midlleware.js";
const messageRouter = express.Router();

messageRouter.get("/:chatroom", authUser, messageController.getMessages);
messageRouter.post("/:chatroom", authUser, messageController.createMessage);

export default messageRouter;
