import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import { exec } from "child_process";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// 1. Import the core DNS module
import dns from "dns";

// 2. Safely set DNS servers (helpful on Windows local environment)
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (dnsErr) {
  console.log("DNS setServers warning:", dnsErr.message);
}

//configure env
dotenv.config();
//database config

connectDB();

import mongoose from "mongoose";

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan(`dev`));

// Health check endpoint for debugging DB status
app.get("/api/health", (req, res) => {
  const dbStatus = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  res.json({
    status: "ok",
    dbState: dbStatus[mongoose.connection.readyState] || "Unknown",
    hasMongoUrl: Boolean(process.env.MONGO_URL)
  });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Serve static files
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});
//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white,
  );

  // Automatically open the frontend in the default browser
  const url = `http://localhost:${PORT}`;
  const startCommand =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(startCommand, (err) => {
    if (err) {
      console.error(`Failed to open browser:`, err);
    }
  });
});
