import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
