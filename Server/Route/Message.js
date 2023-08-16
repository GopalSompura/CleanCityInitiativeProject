import express from "express";
import messageController, {
  getreceivedMessages,
  getsentMessages,
} from "../Controller/Message.js";
import { getMessages } from "../Controller/Message.js";
const messageRouter = express.Router();

messageRouter.post("/Message", messageController);
messageRouter.get("/:id", getMessages);
messageRouter.get("/receivedmessages/:id", getreceivedMessages);
messageRouter.get("/sentmessages/:id", getsentMessages);
export default messageRouter;
