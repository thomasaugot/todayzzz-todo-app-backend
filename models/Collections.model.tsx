import { Schema, Document, model } from "mongoose";

interface ICollection extends Document {
  name: string;
  user_id: string;
  todo_list: [String];
}

const collectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: [true, "Collection name is required."],
    },
    user_id: {
      type: String,
      required: true,
    },
    todo_list: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Collection = model<ICollection>("Collection", collectionSchema);

export default Collection;
