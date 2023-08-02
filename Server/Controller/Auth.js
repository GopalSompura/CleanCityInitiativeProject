import userModel from "../Model/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { passwordregex } from "../Regex/regex.js";
// import { createClient } from "redis";
// import util from "util";

// const client = createClient({ legacyMode: true });
// await client.connect();
// client.get = util.promisify(client.get);
// client.set = util.promisify(client.set);

export default async function createUser(req, res) {
  const createUser = new userModel(req.body);
  const token = jwt.sign({ Email: req.body.Email }, process.env.SECRET_KEY);
  const user = await userModel.findOne({ Email: req.body.Email }).exec();
  if (user) {
    res.json({
      message: "User Email already exists, Please try different Email id",
    });
  } else if (
    /^[!@#$%25^&*()\".]+$/.test(req.body.FirstName) ||
    /^[!@#$%25^&*()\".]+$/.test(req.body.LastName)
  ) {
    res.json({
      message: "First name or Last name cannot contain special characters",
    });
  } else if (req.body.Password == "") {
    res.json({ message: "Every field must be filled" });
  } else if (!passwordregex.test(req.body.Password)) {
    res.json({
      message:
        "Password must be - Minimun 8 characters, Must have at least one uppercase letter, Must have at least one lowercase letter, Must have at least one special character : @ , $ , ! , % , * , ? , &",
    });
  } else if (req.body.Password !== req.body.ConfirmPassword) {
    res.json({ message: "Confirm password should match with Password" });
  } else if (req.body.Password == req.body.ConfirmPassword) {
    // const { Email, Password } = req.body;
    // await client.set(Email, Password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    createUser.token = token;
    createUser.Password = hash;
    createUser
      .save()
      .then(() => {
        res.json({ success: "User Successfully created" });
      })
      .catch((err) => {
        res.json({ message: "Every field must be filled" });
      });
  } else {
    res.json({ message: "Every field must be filled" });
  }
}

export async function loginUser(req, res) {
  try {
    const user = await userModel.findOne({ Email: req.body.Email }).exec();
    const userid = user._id;

    if (!user || req.body.Email === "") {
      res
        .status(401)
        .json({
          message: "Either Email id is Incorrect or the field is empty",
        });
    } else if (req.body === "") {
      res.json({ message: "Every field must be filled" });
    } else if (req.body.Password === "") {
      res.json({ message: "Password cannot be empty" });
    }
    const match = await bcrypt.compare(req.body.Password, user.Password);

    if (match) {
      const token = user.token;
      const username = user.FirstName;
      const email = user.Email;
      const lastname = user.LastName;
      const image = user.Image;
      res.json({
        match,
        token,
        username,
        email,
        image,
        userid,
        lastname,
        message: "Login Successfull",
      });
    } else {
      res.status(401).json({ message: "Password is Incorrect" });
    }
  } catch (error) {}
}
