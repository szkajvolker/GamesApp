import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rawgRoutes from "./routes/rawg.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://games-store-db.netlify.app"],
  })
);

app.use(express.json());
app.use("/api/games", rawgRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
