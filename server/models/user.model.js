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

// ✅ Virtual field for plaintext password
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// ✅ Methods for encryption
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

export default mongoose.model("User", UserSchema);
