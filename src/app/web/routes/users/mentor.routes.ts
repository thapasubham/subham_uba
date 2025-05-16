import express from "express";

import {
  checkID,
  checkQuery,
  validate,
} from "../../middleware/validate.middleware.js";
import { MentorController } from "../../controller/MentorController.js";

const router = express.Router();

const mentorController = new MentorController();

router.get("/", checkQuery, mentorController.GetMentors);
router.get("/:id", checkID, mentorController.GetMentor);
router.post("/", validate, mentorController.CreateMentor);
router.delete("/:id", checkID, mentorController.DeleteMentor);
router.put("/:id", checkID, validate, mentorController.UpdateMentor);

export const mentorRoutes = router;
