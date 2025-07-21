import Project from "../models/project.model.js";
import errorHandler from "./error.controller.js";

// Create a new project (Admin only)
const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(200).json({ message: "✅ Project created successfully!" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// List all projects (Public)
const list = async (req, res) => {
  try {
    const projects = await Project.find().sort({ created: -1 });
    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch projects" });
  }
};

// Delete a project (Admin only)
const remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: " Project deleted!" });
  } catch (err) {
    res.status(400).json({ error: "Could not delete project" });
  }
};

export default { create, list, remove };
