import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "../src/routes/userRouter.js";
import messageRouter from "../src/routes/messageRouter.js";
import { dbConnection } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


const allowedOrigins = [
  "http://localhost:5174",
  process.env.FRONTEND_URL, 
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", messageRouter);

dbConnection().then(() => {
  app.listen(port, () => {
    console.log("The app is up and running on port " + port);
  });
});
