import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required"
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,

  // ew Role Field
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

export default mongoose.model("User", UserSchema);
