import conversationModel from "../Model/Conversation.js";

export default async function conversationController(req, res) {
  const newConversation = new conversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getConversation(req, res) {
  try {
    const conversation = await conversationModel.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
}
