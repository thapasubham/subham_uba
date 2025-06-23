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
import { ValidateUnique } from "../middleware/duplicateEmail.middleware.js";
import { Mentor } from "../../../entity/user.js";

const router = express.Router();

const mentorController = new MentorController();
const unique = new ValidateUnique(Mentor);
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
  // Auth.isAuthorized(PermissionType.ADMIN_ADD),
  validate,
  unique.isUnique.bind(unique),
  mentorController.CreateMentor
);
router.delete(
  "/:id",
  Auth.isAuthorized(PermissionType.ADMIN_DELETE),
  checkID,
  mentorController.DeleteMentor
);
router.put(
  "/:id",

  Auth.isAuthorized(PermissionType.ADMIN_EDIT),
  checkID,
  validate,
  unique.isUnique.bind(unique),

  mentorController.UpdateMentor
);
router.post("/login", validateLogin, mentorController.login);
router.post("/refreshToken", refreshTokenValid, mentorController.Refresh);
export const mentorRoutes = router;
