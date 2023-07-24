import { connectToDB } from "@utils/database";
import User from "@models/user";

import { NextApiRequest, NextApiResponse } from "next";

//GET
export const GET = async (req: NextApiRequest, { params }) => {
  console.log("params: ", params);
  // const { id: userId } = params;

  try {
    await connectToDB();
    // const userData = await User.findById(userId);

    // return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: "error" });
  }
};
