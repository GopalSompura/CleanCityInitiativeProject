import express from "express";
import conversationController, {
  getConversation,
} from "../Controller/Conversation.js";
const conversationRouter = express.Router();

conversationRouter.post("/Conversation", conversationController);
conversationRouter.get("/:id", getConversation);
export default conversationRouter;
