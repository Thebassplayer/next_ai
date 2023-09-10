import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
  }

  interface ProviderList extends Record<string, ClientSafeProvider> {
    [key: string]: ClientSafeProvider;
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    picture: string;
  }

  type UserId = Pick<Profile, "id">;
}
