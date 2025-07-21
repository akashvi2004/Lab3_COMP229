import express from "express";
import educationCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/educations")
  .get(educationCtrl.list)  // anyone can view
  .post(authCtrl.requireSignin, educationCtrl.create); // only logged-in

router.route("/api/educations/:educationId")
  .get(educationCtrl.read)
  .put(authCtrl.requireSignin, educationCtrl.update) // logged-in users
  .delete(authCtrl.requireSignin, educationCtrl.remove);

router.param("educationId", educationCtrl.educationById);
// Only admin can delete
router.route("/api/educations/:educationId")
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.remove);

export default router;
