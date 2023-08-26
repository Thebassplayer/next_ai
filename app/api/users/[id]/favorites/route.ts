import Post from "@models/post";
import User from "@models/user";
import UserFavorite from "@models/userFavorite";
import { connectToDB } from "@utils/database";

export const PATCH = async (
  req: Request,
  { params }: { params: Params; searchParams: URLSearchParams }
) => {
  const { searchParams } = new URL(req.url);
  const userId = params.id;
  const postId = searchParams.get("postid");
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const userFavorite = await UserFavorite.findOne({ userId, postId });

    if (userFavorite) {
      // If userFavorite exists, remove it
      await userFavorite.deleteOne();
    } else {
      // If userFavorite doesn't exist, create it
      await UserFavorite.create({
        userId,
        postId,
        post: { prompt, tag, shared: false },
      });
    }

    console.log("Posts favorited/unfavorited successfully!");

    return new Response(
      JSON.stringify({
        message: "Posts favorited/unfavorited successfully!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: Params;
  }
) => {
  const userId = params.id;
  console.log(userId);
  try {
    await connectToDB();

    const favoritePosts = await UserFavorite.find({
      userId: params.id, // Find UserFavorites with the given userId
    }).populate("postId"); // Populate the postId reference with the actual Post data

    console.log("Favorites retrieved successfully!", favoritePosts);

    return new Response(JSON.stringify(favoritePosts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
