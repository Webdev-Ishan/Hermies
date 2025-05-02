import express from "express";
const paymentRouter = express.Router();
import * as paymentController from "../Controller/payment.controller.js";
paymentRouter.post("/donate", paymentController.donate);

export default paymentRouter;
