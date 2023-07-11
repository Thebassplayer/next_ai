import mongoose from "mongoose";
import User from "@models/user";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export const generateUniqueUsername = async () => {
  let proposedName = Math.random().toString(36).substring(2, 10); // generate a random string
  let userExist = await User.findOne({ username: proposedName }); // check if the username already exists
  while (userExist) {
    proposedName += Math.floor(Math.random() * 10); // add a random number to the username
    userExist = await User.findOne({ username: proposedName }); // check again if the username exists
  }
  return proposedName;
};
