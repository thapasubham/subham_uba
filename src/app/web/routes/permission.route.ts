import express from "express";
import { PermissionController } from "../controller/PermissionController.js";
import { checkID } from "../middleware/validate.middleware.js";

const router = express.Router();

const permissionController = new PermissionController();
router.get("/", permissionController.ReadPermissions);
router.get("/:id", checkID, permissionController.ReadPermission);
router.post("/", permissionController.CreatePermission);
router.delete("/:id", checkID, permissionController.DeletePermission);
router.put("/:id", checkID, permissionController.UpdatePermission);

export const permissionRoutes = router;
