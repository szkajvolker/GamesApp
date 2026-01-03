import mongoose from "mongoose";

const GameCacheSchema = new mongoose.Schema({
  cacheKey: { type: String, unique: true },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("GameCache", GameCacheSchema);
