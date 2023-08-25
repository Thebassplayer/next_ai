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
  try {
    await connectToDB();
    const favorites = await User.findById(params.id).populate("favorites");

    return new Response(JSON.stringify(favorites), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
