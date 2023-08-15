import express from "express";
import feedbackcontroller from "../Controller/Feedback.js";
import getallfeedbacks from "../Controller/getfeedbacks.js";
const feedbackRouter = express.Router();

feedbackRouter.post("/reviews", feedbackcontroller);
feedbackRouter.get("/getfeedbacks", getallfeedbacks);
export default feedbackRouter;
