const mongoose = require("mongoose");

const mongodbUrl = "mongodb+srv://khushimehta82339:khushi_mehta_123@cluster0.swfnxkq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

module.exports = { connectDb };
