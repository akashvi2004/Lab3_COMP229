import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: "Title is required" },
  description: String,
  link: String,
  technologies: [String],
  created: { type: Date, default: Date.now }
});

export default mongoose.model("Project", ProjectSchema);
