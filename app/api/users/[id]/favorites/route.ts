import Post from "@models/post";
import User from "@models/user";
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

    const user = await User.findById(userId);

    if (user.favorites.includes(postId)) {
      // If postId exists in favorites, remove it
      user.favorites.pull(postId);
    } else {
      // If postId doesn't exist in favorites, add it
      user.favorites.addToSet(postId);
    }

    const updatedUser = await user.save();

    console.log("Posts favorited/unfavorited successfully!", updatedUser);

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const GET = async (req: Request, { params }) => {
  console.log("GETTING FAVORITES", params);
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User not found", {
        status: 404,
      });
    }

    const favoritePosts = await Post.find({
      _id: { $in: user.favorites }, // Retrieve posts with IDs present in user's favorites array
    });

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
