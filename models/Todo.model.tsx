import { Schema, Document, model } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  collection_id: string; // Reference to the Collection this todo belongs to
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Todo title is required."],
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    collection_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
