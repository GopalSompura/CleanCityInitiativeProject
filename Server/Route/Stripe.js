import stripePayment from "../Controller/Stripe.js";
import express from "express";
const stripeRouter = express.Router();

stripeRouter.post("/checkout", stripePayment);

export default stripeRouter;
