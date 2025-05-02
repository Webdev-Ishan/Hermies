import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import DbConnect from "./Config/mongoDb.js";
import cors from "cors";
import authRouter from "./Routes/auth.Routes.js";
import userRouter from "./Routes/user.Routes.js";
import aiRouter from "./Routes/ai.routes.js";
import paymentRouter from "./Routes/payment.routes.js";
import cloudConfig from "./Config/cloudinary.js";
const port = process.env.port || 3000;
const app = express();
DbConnect();
cloudConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
