const { Schema } = mongoose;
import mongoose from "mongoose";

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Image: { type: String, default: null },
  token: { type: String },
});
const userModel = mongoose.model("users", userSchema);
export default userModel;
