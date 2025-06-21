import express from "express";
import mongoose from "mongoose";
import { connectToMongoDB } from "./config/database/database.js";
import cors from "cors";
import { socketIo } from "./config/socket.io/sockets.js";
import userRoute from "./route/user.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app = express();
const httpServer = createServer();

connectToMongoDB();

app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
  })
);
app.use("/api/users", userRoute);

const expressServer = app.listen(3000, () => {
  console.log("connected in port 3000");
});

// httpServer.listen(expressServer)

socketIo(expressServer);
