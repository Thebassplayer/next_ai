import { connectToDB } from "@utils/database";
import User from "@models/user";

//PATCH
export const PATCH = async (req, { params }) => {
  const { userId } = await req.json();

  try {
    await connectToDB();

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
