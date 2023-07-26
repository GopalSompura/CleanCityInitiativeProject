import userModel from "../Model/User.js";
import "dotenv/config";
// import { createClient } from "redis";
// import util from "util";

// const client = createClient({ legacyMode: true });
// await client.connect();
// client.get = util.promisify(client.get);
// client.set = util.promisify(client.set);
export default async function getUserById(req, res) {
  const { id } = req.params;
  // const value = await client.get(id);
  // console.log(value);
  try {
    const getUser = await userModel.findById(id).exec();
    res.json(getUser);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const updateUser = await userModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .exec();

    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
}
