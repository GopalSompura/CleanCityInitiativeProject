const { Schema } = mongoose;
import mongoose from "mongoose";

const feedbackschema = new Schema({
  senderid: {
    type: String,
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
});
const feedbackmodel = mongoose.model("feedbacks", feedbackschema);
export default feedbackmodel;
