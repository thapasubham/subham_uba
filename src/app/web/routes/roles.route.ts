import express from "express";

import { RoleController } from "../controller/RoleController.js";
import { Auth } from "../auth/authorization.js";
import {checkID} from "../middleware/validate.middleware";

const router = express.Router();

const roleController = new RoleController();
router.get("/", roleController.ReadRoles);
router.get("/:id", Auth.isAuthorized("view:role"), checkID,  roleController.ReadRole);
router.post("/", Auth.isAuthorized("add:role"), roleController.CreateRole);
router.put("/:id", Auth.isAuthorized("add:role"),checkID, roleController.UpdateRole);
router.delete("/:id", Auth.isAuthorized("delete:role"), checkID,roleController.DeleteRole);
export const rolesRoutes = router;
