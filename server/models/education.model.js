import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  institution: {
    type: String,
    required: "Institution name is required",
  },
  startDate: {
    type: Date,
    required: "Start date is required",
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Education", EducationSchema);
