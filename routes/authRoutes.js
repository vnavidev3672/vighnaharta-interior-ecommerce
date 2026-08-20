import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ success: false, message: "Please fill all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role: role || 0 });
    await user.save();
    res.status(201).send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error registering user", error });
  }
});

// Login API — accepts username OR email
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ success: false, message: "Please provide username/email and password" });
    }
    const queryTerm = username.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Allow login with either username or email (case-insensitive)
    const user = await User.findOne({
      $or: [
        { username: { $regex: new RegExp("^" + queryTerm + "$", "i") } },
        { email: { $regex: new RegExp("^" + queryTerm + "$", "i") } }
      ]
    });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found. Please check your username or email." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: "Invalid password. Please try again." });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "SECRET_KEY", { expiresIn: "7d" });
    res.status(200).send({ success: true, message: "Login successful", user, token });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in login", error });
  }
});

export default router;
