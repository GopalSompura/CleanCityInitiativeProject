import feedbackmodel from "../Model/Feedback.js";
export default async function getallfeedbacks(req, res) {
  try {
    const response = await feedbackmodel.find({});
    res.json(response);
  } catch (error) {
    res.send(error);
  }
}
