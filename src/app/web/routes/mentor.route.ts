import express from "express";

import {
  checkID,
  checkQuery,
  validate,
  validateLogin,
} from "../middleware/validate.middleware.js";
import { MentorController } from "../controller/MentorController.js";
import { Auth } from "../auth/authorization.js";
import { PermissionType } from "../../../types/permission.types.js";
import refreshTokenValid from "../auth/refreshToken.auth.js";

const router = express.Router();

const mentorController = new MentorController();

router.get(
  "/",

  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  checkQuery,
  mentorController.GetMentors
);
router.get(
  "/:id",
  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  checkID,
  mentorController.GetMentor
);
router.post(
  "/",
  Auth.isAuthorized(PermissionType.ADMIN_ADD),
  validate,
  mentorController.CreateMentor
);
router.delete(
  "/:id",
  Auth.isAuthenticated,
  Auth.isAuthorized(PermissionType.ADMIN_DELETE),
  checkID,
  mentorController.DeleteMentor
);
router.put(
  "/:id",
  Auth.isAuthenticated,
  Auth.isAuthorized(PermissionType.ADMIN_EDIT),
  checkID,
  validate,
  mentorController.UpdateMentor
);
router.post("/login", validateLogin, mentorController.login);
router.post("/refreshToken", refreshTokenValid, mentorController.Refresh);
export const mentorRoutes = router;
