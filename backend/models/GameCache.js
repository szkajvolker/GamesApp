import mongoose from "mongoose";

const GameCacheSchema = new mongoose.Schema({
  cacheKey: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("GameCache", GameCacheSchema);
