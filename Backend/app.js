import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import DbConnect from "./Config/mongoDb.js";
import { setupSocket } from "./Services/Socket.service.js";
import cors from "cors";
import authRouter from "./Routes/auth.Routes.js";
import userRouter from "./Routes/user.Routes.js";
import aiRouter from "./Routes/ai.routes.js";
import paymentRouter from "./Routes/payment.routes.js";
import cloudConfig from "./Config/cloudinary.js";
import { redisconnect } from "./Config/redis.js";
import chatRoutes from "./Routes/chat.Routes.js";
import messageRoutes from "./Routes/message.Routes.js";
import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React frontend URL
    methods: ["GET", "POST"],
  },
});

DbConnect();
cloudConfig();
await redisconnect();
setupSocket(io); // move logic to another file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
