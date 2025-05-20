import express from "express";

import { UserController } from "../../controller/UserController.js";
import {
  checkID,
  checkQuery,
  validate,
} from "../../middleware/validate.middleware.js";
import { Auth } from "../../auth/jwt.js";

const router = express.Router();

const usersHandler = new UserController();

router.get("/getUsers", checkQuery, usersHandler.GetUsers);
router.get("/getUser/:id", Auth.isAuthenticated, checkID, usersHandler.GetUser);
router.post("/createUser", validate, usersHandler.CreateUser);
router.post("/login", usersHandler.login);
router.delete(
  "/deleteUser/:id",
  Auth.isAuthenticated,
  checkID,
  usersHandler.DeleteUser
);
router.put(
  "/updateUser/:id",
  Auth.isAuthenticated,
  checkID,
  validate,
  usersHandler.UpdateUser
);

export const userRouter = router;
