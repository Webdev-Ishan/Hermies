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
import reviewRouter from "./Routes/review.Routes.js";
import { redisconnect } from "./Config/redis.js";
import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(
  server,{
  cors:{
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  }
}
);

DbConnect();
cloudConfig();
await redisconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://hermies-frontend.onrender.com", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

io.on("connection", (socket) => {
  console.log("Connected",socket.id);
  socket.on('geo-location',(data)=>{
    socket.emit("locations",{id:socket.id,...data})
  })
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
