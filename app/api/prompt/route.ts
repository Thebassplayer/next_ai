import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (req: Request, res: Request) => {
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
