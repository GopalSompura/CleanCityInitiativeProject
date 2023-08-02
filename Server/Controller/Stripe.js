import "dotenv/config";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function stripePayment(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: req.body.description,
            },
            unit_amount: req.body.amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5000/Success",
      cancel_url: "http://localhost:5000/Cancel",
    });
    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
}
