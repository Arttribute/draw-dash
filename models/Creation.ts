import mongoose from "mongoose";
import User from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface Creation extends mongoose.Document {
  drawing_url: string;
  enhanced_image: string;
  name: string;
  prompt: string;
  owner: object;
  minted: boolean;
  listed: boolean;
  price: number;
  score: number;
  time_taken: number;
  similarity: number;
}

const creationSchema = new mongoose.Schema(
  {
    drawing_url: {
      type: String,
      required: true,
    },
    enhanced_image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    prompt: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: User,
    },
    minted: {
      type: Boolean,
      default: false,
    },
    listed: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    time_taken: {
      type: Number,
      default: 0,
    },
    similarity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Creation =
  mongoose.models.Creation || mongoose.model("Creation", creationSchema);

export default Creation;
