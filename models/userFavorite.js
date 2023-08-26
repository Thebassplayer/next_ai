import { Schema, model, models } from "mongoose";

const UserFavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  post: {
    prompt: {
      type: String,
      required: [true, "Please provide a prompt"],
    },
    tag: {
      type: String,
      required: [true, "Please provide a tag"],
    },
    shared: {
      type: Boolean,
      default: false,
    },
  },
});

const UserFavorite =
  models.UserFavorite || model("UserFavorite", UserFavoriteSchema);

export default UserFavorite;
