import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// Mongo DB
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { generateUniqueUsername } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser?._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        if (!profile.email) throw new Error("No email found");

        await connectToDB();

        // Check if the user already exists in the database
        const userExist = await User.findOne({ email: profile.email });

        // If the user does not exist, create a new user
        if (!userExist) {
          const newUser = await generateUniqueUsername();
          await User.create({
            email: profile.email,
            username: newUser,
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
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
