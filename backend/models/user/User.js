import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    name: { type: String, trim: true },
    password: { type: String, required: true, select: false },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
