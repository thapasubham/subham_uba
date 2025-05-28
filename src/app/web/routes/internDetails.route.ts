import express from "express";
import { InternDetailsController } from "../controller/InternDetailsController.js";
import { checkID, checkQuery } from "../middleware/validate.middleware.js";
import { PermissionType } from "../../../types/permission.types.js";
import { Auth } from "../auth/authorization.js";

const router = express.Router();

const internDetails = new InternDetailsController();

router.get(
  "/",
  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  checkQuery,
  internDetails.GetInterns
);
router.get(
  "/:id",
  Auth.isAuthorized(PermissionType.ADMIN_VIEW),
  checkID,
  internDetails.GetIntern
);
router.post(
  "/",
  Auth.isAuthorized(PermissionType.ADMIN_ADD),
  internDetails.CreateIntern
);
router.put(
  "/:id/certify",
  Auth.isAuthorized(PermissionType.ADMIN_EDIT),
  checkID,
  internDetails.Certify
);
export const internDetailsRoutes = router;
