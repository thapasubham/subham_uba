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

const router = express.Router();

const usersHandler = new UserController();

router.get(
  "/getUsers",

  Auth.isAuthorized(PermissionType.VIEW),
  checkQuery,
  usersHandler.GetUsers
);
router.get(
  "/getUser/:id",
  Auth.isAuthorized(PermissionType.VIEW),
  checkID,
  usersHandler.GetUser
);
router.post("/createUser", validate, usersHandler.CreateUser);
router.post("/user/login", validateLogin, usersHandler.login);
router.delete(
  "/deleteUser/:id",
  Auth.isAuthorized(PermissionType.DELETE),
  checkID,
  usersHandler.DeleteUser
);
router.put(
  "/updateUser/:id",
  Auth.isAuthenticated,
  Auth.isAuthorized(PermissionType.EDIT),
  checkID,
  validate,
  usersHandler.UpdateUser
);

export const userRouter = router;
