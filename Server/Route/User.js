import getUserById, { updateUser } from "../Controller/User.js";
import express from "express";
const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUser);

export default userRouter;
