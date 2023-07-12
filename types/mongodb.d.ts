import { ObjectId } from "mongodb";

declare module "mongodb" {
  interface Post {
    id?: string;
    _id?: ObjectId;
    creator?: User;
    prompt: string;
    tag?: string;
    shared?: boolean;
  }

  interface User {
    id?: string;
    _id?: string;
    email: string;
    username: string;
    image: string;
    favourites: Post[];
  }
}
