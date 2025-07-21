import Education from "../models/education.model.js";
import errorHandler from "./error.controller.js";

// CREATE
const create = async (req, res) => {
  const education = new Education(req.body);
  education.createdBy = req.auth._id; // logged-in user
  try {
    await education.save();
    return res.status(200).json({ message: "Education created successfully!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// LIST ALL
const list = async (req, res) => {
  try {
    const educations = await Education.find().populate("createdBy", "name email");
    res.json(educations);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// READ ONE
const educationById = async (req, res, next, id) => {
  try {
    const education = await Education.findById(id).populate("createdBy", "name");
    if (!education)
      return res.status(404).json({ error: "Education not found" });
    req.education = education;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve education" });
  }
};

const read = (req, res) => {
  return res.json(req.education);
};

// UPDATE
const update = async (req, res) => {
  try {
    let education = req.education;
    Object.assign(education, req.body);
    education.updated = Date.now();
    await education.save();
    res.json(education);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE
const remove = async (req, res) => {
  try {
    const deletedEducation = await req.education.deleteOne();
    res.json(deletedEducation);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, read, update, remove, educationById };
