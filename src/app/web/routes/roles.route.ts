import express from "express";

import { RoleController } from "../controller/RoleController.js";
import { Auth } from "../auth/authorization.js";

const router = express.Router();

const roleController = new RoleController();
router.get("/", roleController.ReadRoles);
router.get("/:id", Auth.isAuthorized("view:role"), roleController.ReadRole);
router.post("/", Auth.isAuthorized("add:role"), roleController.CreateRole);
router.put("/:id", Auth.isAuthorized("add:role"), roleController.UpdateRole);

export const rolesRoutes = router;
