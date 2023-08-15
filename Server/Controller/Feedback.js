import feedbackmodel from "../Model/Feedback.js";

export default async function feedbackcontroller(req, res) {
  const Feedbacks = new feedbackmodel(req.body);
  try {
    const savedfeedback = await Feedbacks.save();
    res.status(200).json(savedfeedback);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
