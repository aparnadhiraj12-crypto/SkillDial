import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    poster: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    platformFee: Number,
    status: { type: String, enum: ["held", "released", "refunded", "disputed"], default: "held" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);