import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  todos: string[];
  collections: string[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    todos: {
      type: [String],
    },
    collections: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
