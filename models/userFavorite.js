import { Schema, model, models } from "mongoose";

const UserFavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Please provide a post"],
  },
});

const UserFavorite =
  models.UserFavorite || model("UserFavorite", UserFavoriteSchema);

export default UserFavorite;
