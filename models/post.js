import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
