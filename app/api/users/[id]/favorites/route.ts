import UserFavorite from "@models/userFavorite";
import { connectToDB } from "@utils/database";

export const PATCH = async (
  req: Request,
  { params }: { params: Params; searchParams: URLSearchParams }
) => {
  const { searchParams } = new URL(req.url);
  const userId = params.id;
  const postId = searchParams.get("postid");

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
  try {
    await connectToDB();

    let userId = params.id;

    // If params.id is initially undefined, wait for it to become available
    while (!userId) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
      userId = params.id;
    }

    const favoritePosts = await UserFavorite.find({ userId })
      .populate({
        path: "postId",
        populate: {
          path: "creator",
          model: "User",
        },
      })
      .lean();

    // Add the isFavorite field with a value of true to every favoritePost
    favoritePosts.forEach(favoritePost => {
      favoritePost.postId.isFavorite = true;
    });

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
