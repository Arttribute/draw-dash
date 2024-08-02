import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  const opts = {
    bufferCommands: false,
  };

  try {
    const connection = await mongoose.connect(MONGODB_URI, opts);
    return connection;
  } catch (e) {
    throw e;
  }
}

export default dbConnect;
