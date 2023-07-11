import { connectToDB } from "@utils/database";
import User from "@models/user";

//PATCH
export const PATCH = async (req, { params }) => {
  const { userId } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.favourite = favourite;
    existingPrompt.shared = shared;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
