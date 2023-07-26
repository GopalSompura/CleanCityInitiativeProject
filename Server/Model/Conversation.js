const { Schema } = mongoose;
import mongoose from "mongoose";

const conversationSchema = new Schema({
  members: {
    type: Array,
  },
});
const conversationModel = mongoose.model("conversation", conversationSchema);
export default conversationModel;
