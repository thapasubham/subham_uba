import express from "express";

import { checkID, validateIntern } from "../middleware/validate.middleware.js";
import { InternController } from "../controller/InternController.js";
import { PermissionType } from "../../../types/permission.types";
import { Auth } from "../auth/authorization.js";

const router = express.Router();

const internHandler = new InternController();

router.get(
  "/",
  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  internHandler.GetIntern
);
router.get(
  "/get/:id",
  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  checkID,
  internHandler.GetIntern
);
router.post(
  "/",
  Auth.isAuthorized(PermissionType.ADMIN_ADD),
  validateIntern,
  internHandler.CreateIntern
);
router.delete(
  "/:id",
  Auth.isAuthorized(PermissionType.ADMIN_DELETE),
  checkID,
  internHandler.DeleteIntern
);
router.put(
  "/:id",
  Auth.isAuthorized(PermissionType.ADMIN_EDIT),
  validateIntern,
  checkID,
  internHandler.UpdateIntern
);

export const internRoutes = router;
