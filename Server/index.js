import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const server = express();
import userRouter from "./Route/User.js";
import authRouter from "./Route/Auth.js";
import cors from "cors";
import conversationRouter from "./Route/Conversation.js";
import messageRouter from "./Route/Message.js";
// import Server from "socket.io";

// const io = new socketserver(Server, {
//   cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//   });
// });

//Middleware - Body parser
server.use(cors());
server.use(express.json());
server.use("/", authRouter);
server.use("/", userRouter);
server.use("/conversations", conversationRouter);
server.use("/messages", messageRouter);

//DB connection
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}
main().catch((err) => console.log(err));

server.listen(process.env.PORT, () => {
  console.log("Server started at", process.env.PORT);
});
