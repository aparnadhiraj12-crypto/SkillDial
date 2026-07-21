import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pitch: String,
    proposedRate: Number,
    status: { type: String, enum: ["pending", "hired", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);