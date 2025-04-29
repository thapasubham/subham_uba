import express from "express";

import { UserController } from "../../controller/UserController";
import { checkID, validate } from "../../middleware/validate.middleware.js";

const router = express.Router();

const usersHandler = new UserController();

router.get("/getUsers", usersHandler.GetUsers);
router.get("/getUser/:id", checkID, usersHandler.GetUser);
router.post("/createUser", validate, usersHandler.CreateUser);
router.delete("/deleteUser/:id", checkID, usersHandler.DeleteUser);
router.put("/updateUser/:id", checkID, validate, usersHandler.UpdateUser);

export default router;
