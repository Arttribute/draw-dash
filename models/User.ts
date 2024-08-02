import mongoose from "mongoose";
import { defaultProfile } from "@/data/defaults";
import { generateName } from "@/lib/utils";

export interface User extends mongoose.Document {
  web3Address: string;
  email: string;
  name: string;
  description: string;
  picture: string;
  credits: number;
}

const userSchema = new mongoose.Schema(
  {
    web3Address: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    name: {
      type: String,
      default: generateName(),
    },
    description: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    picture: {
      type: String,
      default: defaultProfile,
    },
    credits: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
