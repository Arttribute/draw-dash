import mongoose from "mongoose";

const STUDIO_MONGODB_URI = process.env.STUDIO_MONGODB_URI!;

if (!STUDIO_MONGODB_URI) {
  throw new Error(
    "Please define the STUDIO_MONGODB_URI environment variable inside .env.local"
  );
}

async function studioConnect() {
  const opts = {
    bufferCommands: false,
  };

  try {
    const connection = await mongoose.connect(STUDIO_MONGODB_URI, opts);
    return connection;
  } catch (e) {
    throw e;
  }
}

async function studioDisconnect() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (e) {
    console.error("Error while disconnecting from MongoDB", e);
    throw e;
  }
}

export { studioConnect, studioDisconnect };
