// server.js
const app = require(".");
const { connectDb } = require("./config/db");

const PORT = 5454;

const startServer = async () => {
  try {
    await connectDb(); // ✅ Ensure DB is connected first
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err.message);
    process.exit(1); // Stop the app
  }
};

startServer();
