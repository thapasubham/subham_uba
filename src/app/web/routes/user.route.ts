import express from "express";

import { UserController } from "../controller/UserController.js";
import {
  checkID,
  checkQuery,
  validate,
  validateLogin,
} from "../middleware/validate.middleware.js";
import { Auth } from "../auth/authorization.js";

const router = express.Router();

const usersHandler = new UserController();

router.get(
  "/getUsers",
  Auth.isAuthorized("user:view"),
  checkQuery,
  usersHandler.GetUsers
);
router.get(
  "/getUser/:id",
  Auth.isAuthorized("user:view"),
  checkID,
  usersHandler.GetUser
);
router.post("/createUser", validate, usersHandler.CreateUser);
router.post("/user/login", validateLogin, usersHandler.login);
router.delete(
  "/deleteUser/:id",
  Auth.isAuthorized("user:delete"),
  checkID,
  usersHandler.DeleteUser
);
router.put(
  "/updateUser/:id",
  Auth.isAuthorized("user:update"),
  checkID,
  validate,
  usersHandler.UpdateUser
);

export const userRouter = router;
