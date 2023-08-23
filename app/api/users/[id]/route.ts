import { connectToDB } from "@utils/database";
import User from "@models/user";

import { NextApiRequest, NextApiResponse } from "next";

//GET
export const GET = async (req: NextApiRequest, { params }) => {
  console.log("params: ", params);
  const { id: userId } = params;

  try {
    await connectToDB();
    const userData = await User.findById(userId);

    return new Response(JSON.stringify(userData), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
