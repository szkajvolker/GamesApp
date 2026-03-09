import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema(
  {
    id: String,
    count: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Statistics", statisticsSchema);
