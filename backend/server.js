import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import rawgRoutes from "./routes/rawg.routes.js";
import userRoutes from "./routes/user.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import cors from "cors";

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8"]);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://games-store-db.netlify.app"],
  }),
);

app.use(express.json());
app.use("/api/games", rawgRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🟢 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Failed to start server:", error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error("⛔ Unexpected error during server startup:", error);
  process.exit(1);
});
