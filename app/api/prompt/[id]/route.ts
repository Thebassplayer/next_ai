import { connectToDB } from "@utils/database";
import Post from "@models/post";

// GET
export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectToDB();
    const prompt = await Post.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Post not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

//PATCH
export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const { prompt, tag, shared } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Post.findById(params.id);

    if (!existingPrompt) {
      return new Response("Post not found", {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
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

//DELETE
export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Post.findById(params.id);

    if (!existingPrompt) {
      return new Response("Post not found", {
        status: 404,
      });
    }

    await Post.findByIdAndRemove(params.id);

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
