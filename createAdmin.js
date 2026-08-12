import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");

    const username = "omkar3672";
    const password = "om@3672";
    const email = "omkar3672@gmail.com"; // dummy email for the admin

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Admin user already exists in the database.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 1 // 1 signifies an Admin role
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
