import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  { name: String, level: { type: Number, min: 1, max: 5 } },
  { _id: false }
);

const portfolioItemSchema = new mongoose.Schema(
  { title: String, description: String, url: String, fileUrl: String },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["freelancer", "poster"], required: true },

    college: String,
    course: String,
    year: Number,
    bio: String,
    college: String,
    course: String,
    year: Number,
    graduationYear: Number,
    skills: [skillSchema],
    portfolio: [portfolioItemSchema],
    hourlyRate: Number,
    rating: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },

    posterType: { type: String, enum: ["student", "company"] },
    companyName: String,

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);