import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user already exists in the database
        const userExist = await User.findOne({ email: profile.email });

        // If the user does not exist, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;

        // If the user exists, return true to sign in
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser?._id.toString();

      return session;
    },
  },
});

export { handler as GET, handler as POST };
