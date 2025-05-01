import express from "express";
const aiRouter = express.Router();
import { authUser } from "../Middleware/auth.midlleware.js";
import * as aiController from "../Controller/ai.controller.js";

aiRouter.post("/response", authUser, aiController.result);

export default aiRouter;
