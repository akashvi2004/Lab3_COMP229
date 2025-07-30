import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// ✅ Public: View all projects
router.get("/api/projects", projectCtrl.list);

// ✅ Admin: Create a new project
router.post(
  "/api/projects",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  projectCtrl.create
);

// ✅ Admin: Delete a project by ID
router.delete(
  "/api/projects/:projectId",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  projectCtrl.remove
);

export default router;
