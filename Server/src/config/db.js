import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/product_dashboard";
    await mongoose.connect(mongoDB); //
    console.log(" MongoDB connected successfully.");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
