import express from "express";

import { RoleController } from "../controller/RoleController.js";

const router = express.Router();

const roleController = new RoleController();
router.get("/", roleController.ReadROles);
router.get("/:id", roleController.ReadRole);
router.post("/", roleController.CreateRole);
router.put("/:id", roleController.UpdateRole);

export const rolesRoutes = router;
