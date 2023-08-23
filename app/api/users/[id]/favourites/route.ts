import { NextApiRequest, NextApiResponse } from "next";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req: NextApiRequest, { params }) => {
  try {
    await connectToDB();
    const favourites = await User.findById(params.id).populate("favourites");

    return new Response(JSON.stringify(favourites), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
