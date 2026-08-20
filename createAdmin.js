import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import dns from "dns";
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {}

dotenv.config();

export const seedAdminUser = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }
    const username = process.env.ADMIN_USERNAME || "omkar3672";
    const password = process.env.ADMIN_PASSWORD || "om@3672";
    const email = process.env.ADMIN_EMAIL || "omkar3672@gmail.com";

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({
      $or: [
        { username: { $regex: new RegExp("^" + username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") } },
        { email: { $regex: new RegExp("^" + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") } }
      ]
    });

    if (existingUser) {
      existingUser.role = 1;
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log("Admin user updated successfully with full Admin rights!");
      return existingUser;
    }

    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 1 // 1 = Admin role
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    return adminUser;
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
};

const createAdminCLI = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB...");
    }
    await seedAdminUser();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin via CLI:", error);
    process.exit(1);
  }
};

// If run directly via node createAdmin.js
if (process.argv[1] && process.argv[1].endsWith("createAdmin.js")) {
  createAdminCLI();
}

