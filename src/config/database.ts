import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async (): Promise<void> => {
  console.log(process.env.MONGODB_URI, "MongoDB URI Loaded++++++++++++++++");

  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/auth_system";

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("📡 MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ MongoDB error:", error);
});

export default connectDatabase;
