import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req: Request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Post.find({
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
