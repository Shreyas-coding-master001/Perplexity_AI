import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);