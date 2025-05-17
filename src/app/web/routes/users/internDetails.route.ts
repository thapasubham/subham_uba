import express from "express";
import { InternDetailsController } from "../../controller/InternDetailsController.js";
import { checkID } from "../../middleware/validate.middleware.js";

const router = express.Router();

const internDetails = new InternDetailsController();

router.get("/", internDetails.GetInterns);
router.get("/:id", checkID, internDetails.GetIntern);
router.post("/", internDetails.CreateIntern);
router.put("/:id/certify", checkID, internDetails.Certify);
export const internDetailsRoutes = router;
