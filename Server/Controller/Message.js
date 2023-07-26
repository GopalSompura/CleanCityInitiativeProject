import messageModel from "../Model/Message.js";
// import Redis from "redis";

// const redisClient = Redis.createClient({ legacyMode: true });
// await redisClient.connect();
// const default_expiration = 3600;

export default async function messageController(req, res) {
  const newMessage = new messageModel(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
}
// export async function getMessages(req, res) {
//   try {
//     const ID = req.params.id;
//     redisClient.GET(`messages?ID=${ID}`, async (error, messages) => {
//       if (error) console.error(error);
//       if (messages != null) {
//         console.log("cache hit");
//         return res.json(JSON.parse(messages));
//       } else {
//         console.log("cache miss");
//         const messages = await messageModel.find({
//           conversationId: ID,
//         });
//         redisClient.SETEX(
//           `messages?ID=${ID}`,
//           default_expiration,
//           JSON.stringify(messages)
//         );
//         res.status(200).json(messages);
//       }
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
export async function getMessages(req, res) {
  try {
    const ID = req.params.id;
    const messages = await messageModel.find({
      conversationId: ID,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json(error);
  }
}
