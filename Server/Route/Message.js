import express from "express";
import messageController from "../Controller/Message.js";
import { getMessages } from "../Controller/Message.js";
const messageRouter = express.Router();

messageRouter.post("/Message", messageController);
messageRouter.get("/:id", getMessages);
export default messageRouter;
