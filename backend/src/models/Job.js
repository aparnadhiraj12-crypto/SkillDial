import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    poster: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    posterType: { type: String, enum: ["student", "company"], required: true },

    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["assignment", "project", "internship", "gig"], required: true },

    requiredSkills: [{ name: String, minLevel: Number }],

    pricingType: { type: String, enum: ["hourly", "fixed", "stipend"], required: true },
    rate: Number,
    deadline: Date,
    durationWeeks: Number,
    remote: { type: Boolean, default: true },

    status: { type: String, enum: ["open", "in_progress", "completed", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);