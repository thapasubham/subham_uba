import express from "express";

import { checkID, validate } from "../../middleware/validate.middleware.js";
import { InternController } from "../../controller/InternController.js";

const router = express.Router();

const internHandler = new InternController();

router.get("/", internHandler.GetIntern);
router.get("/get/:id", checkID, internHandler.GetIntern);
router.post("/", internHandler.CreateIntern);
router.delete("/:id", checkID, internHandler.DeleteIntern);
router.put("/:id", checkID, internHandler.UpdateIntern);

export const internRoutes = router;
