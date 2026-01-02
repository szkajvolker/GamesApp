import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rawgRoutes from "./routes/rawg.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use("/api/games", rawgRoutes);
//TODO implement cors
//app.use(cors())

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
