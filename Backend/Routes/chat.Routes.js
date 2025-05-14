import express from "express";
import * as chatcontroller from "../Controller/chat.controller.js";
import { authUser } from "../Middleware/auth.midlleware.js";
import { authChat } from "../Middleware/chat.middleware.js";
const chatRouter = express.Router();

chatRouter.post("/createRoom", authChat, chatcontroller.createChat);
chatRouter.get("/getallChats", authUser, chatcontroller.getallChats);

export default chatRouter;
