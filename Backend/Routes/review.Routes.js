import express from "express";
const reviewRouter = express.Router();
import * as reviewController from "../Controller/review.controller.js";
import { authUser } from "../Middleware/auth.midlleware.js";

reviewRouter.post("/sendReview", authUser, reviewController.setreview);
reviewRouter.get("/allReview",  reviewController.allreview);

export default reviewRouter;
