import { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({
  prompt: {
    type: Schema.Types.ObjectId,
    ref: "Prompt",
  },
  favourite: {
    type: Boolean,
    default: false,
  },
});

const Favourite = models.Favourite || model("Favourite", FavouriteSchema);

export default Favourite;
