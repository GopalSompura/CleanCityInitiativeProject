import createUser, { loginUser } from "../Controller/Auth.js";
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import userModel from "../Model/User.js";

//Middleware
const auth = async (req, res, next) => {
  const user = await userModel.findOne({ Email: req.body.Email }).exec();
  if (!user) {
    res.status(401).json({ message: "Email is incorrect" });
  } else {
    try {
      const token = user.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      if (decoded.Email) {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch {
      res.sendStatus(401);
    }
  }
};

authRouter.post("/signup", createUser);
authRouter.post("/signin", auth, loginUser);

export default authRouter;
