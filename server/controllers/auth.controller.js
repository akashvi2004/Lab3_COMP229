import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";

// 🔐 Signin user
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    // ✅ Sign JWT with both _id and role
    const token = jwt.sign(
      { _id: user._id, role: user.role }, 
      config.jwtSecret
    );

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// 🚪 Signout user
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out" });
};

// ✅ Middleware: require signed-in user
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  requestProperty: "auth", // token payload will be available in req.auth
});

// ✅ Middleware: check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== "admin") {
    return res.status(403).json({ error: "Admin only. Access denied." });
  }
  next();
};

// ✅ Middleware: check if user is authorized to access/edit their own data
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin,
  isAdmin,
  hasAuthorization,
};
