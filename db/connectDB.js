const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/userAuth', {});
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1); // Stop the app if DB fails to connect
      }
    };
    
    module.exports = connectDB;