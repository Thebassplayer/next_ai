import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";

import Prompt from "@models/prompt";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();

    const posts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
