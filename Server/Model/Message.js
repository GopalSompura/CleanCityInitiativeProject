const { Schema } = mongoose;
import mongoose from "mongoose";

const messageSchema = new Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});
const messageModel = mongoose.model("messages", messageSchema);
export default messageModel;
