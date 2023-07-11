import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
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
  favourite: {
    type: Boolean,
    default: false,
  },
  shared: {
    type: Boolean,
    default: false,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
