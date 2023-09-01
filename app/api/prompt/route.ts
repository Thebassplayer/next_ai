import { connectToDB } from "@utils/database";
import Post from "@models/post";
import UserFavorite from "@models/userFavorite";

export const GET = async (req: Request, res: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userid");

  try {
    await connectToDB();

    const posts = await Post.find({}).populate("creator").lean(); // Convert to plain JS objects

    const userFavorites = await UserFavorite.find({ userId });

    posts.forEach(post => {
      post.isFavorite = userFavorites.some(fav => fav.postId.equals(post._id));
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
