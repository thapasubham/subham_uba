import express from "express";

import { UserController } from "../controller/UserController.js";
import {
  checkID,
  checkQuery,
  validate,
  validateLogin,
} from "../middleware/validate.middleware.js";
import { Auth } from "../auth/authorization.js";
import { PermissionType } from "../../../types/permission.types.js";
import refreshTokenValid from "../auth/refreshToken.auth.js";

const router = express.Router();

const usersHandler = new UserController();

router.get(
  "/",

  Auth.isAuthorized(PermissionType.VIEW),
  checkQuery,
  usersHandler.GetUsers
);
router.get(
  "/:id",
  Auth.isAuthorized(PermissionType.VIEW),
  checkID,
  usersHandler.GetUser
);
router.post("/", validate, usersHandler.CreateUser);
router.post("/login", validateLogin, usersHandler.login);
router.delete(
  "/:id",
  Auth.isAuthenticated,
  Auth.isAuthorized(PermissionType.DELETE),
  checkID,
  usersHandler.DeleteUser
);
router.put(
  "/:id",
  Auth.isAuthenticated,
  Auth.isAuthorized(PermissionType.EDIT),
  checkID,
  validate,
  usersHandler.UpdateUser
);

router.post("/refreshToken", refreshTokenValid, usersHandler.Refresh);
export const userRouter = router;
