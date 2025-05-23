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
  Auth.isAuthorized("view"),
  checkQuery,
  usersHandler.GetUsers
);
router.get(
  "/getUser/:id",
  Auth.isAuthorized("view"),
  checkID,
  usersHandler.GetUser
);
router.post("/createUser", validate, usersHandler.CreateUser);
router.post("/login", validateLogin, usersHandler.login);
router.delete(
  "/deleteUser/:id",
  Auth.isAuthorized("delete"),
  checkID,
  usersHandler.DeleteUser
);
router.put(
  "/updateUser/:id",
  Auth.isAuthorized("update"),
  checkID,
  validate,
  usersHandler.UpdateUser
);

export const userRouter = router;
