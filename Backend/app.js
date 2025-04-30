import express from "express";
import dotenv from "dotenv";
dotenv.config();
import DbConnect from "./Config/mongoDb.js";
import cors from "cors";
import authRouter from "./Routes/auth.Routes.js";


const port = process.env.port || 3000;
const app = express();
DbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
