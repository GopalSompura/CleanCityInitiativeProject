const { Schema } = mongoose;
import mongoose from "mongoose";

const feedbackschema = new Schema({
  reviewedby: {
    type: String,
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
  userimage: {
    type: String,
  },
});
const feedbackmodel = mongoose.model("feedbacks", feedbackschema);
export default feedbackmodel;
