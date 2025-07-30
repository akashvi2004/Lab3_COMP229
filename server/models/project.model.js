import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  technologies: [String],
  github: String,
  demo: String,
  created: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Project", ProjectSchema);
