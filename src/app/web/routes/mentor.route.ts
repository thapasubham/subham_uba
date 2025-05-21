import express from "express";

import {
  checkID,
  checkQuery,
  validate,
} from "../middleware/validate.middleware.js";
import { MentorController } from "../controller/MentorController.js";
import { Auth } from "../auth/jwt.js";

const router = express.Router();

const mentorController = new MentorController();

router.get("/", checkQuery, mentorController.GetMentors);
router.get("/:id", Auth.isAuthorized, checkID, mentorController.GetMentor);
router.post("/", validate, mentorController.CreateMentor);
router.delete(
  "/:id",
  Auth.isAuthorized,
  checkID,
  mentorController.DeleteMentor
);
router.put(
  "/:id",
  Auth.isAuthorized,
  checkID,
  validate,
  mentorController.UpdateMentor
);
router.post("/login", mentorController.login);

export const mentorRoutes = router;
