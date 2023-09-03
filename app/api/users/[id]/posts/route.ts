import { connectToDB } from "@utils/database";
import Post from "@models/post";
import UserFavorite from "@models/userFavorite";

export const GET = async (req: Request, { params }) => {
  const userId = params.id;
  try {
    await connectToDB();
    const posts = await Post.find({
      creator: userId,
    })
      .populate("creator")
      .lean();

    const userFavorites = await UserFavorite.find({ userId });

    posts.forEach(post => {
      post.isFavorite = userFavorites.some(fav => fav.postId.equals(post._id));
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
