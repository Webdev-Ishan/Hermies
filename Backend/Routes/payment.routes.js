import express from "express";
const paymentRouter = express.Router();
import * as paymentController from "../Controller/payment.controller.js";
import {payment} from '../Middleware/payment.middleware.js'
paymentRouter.post("/donate", payment,paymentController.donate);

export default paymentRouter;
