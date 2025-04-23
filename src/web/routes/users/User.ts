import express from "express";

import { UserController } from "../../controller/UserController.js";
import { validate } from "../../middleware/validate.middleware.js";

const router = express.Router();

const usersHandler = new UserController();


router.get('/getUsers', validate, usersHandler.GetUsers);
router.get('/getUser/:id', usersHandler.GetUser);
router.post('/createUser',validate,  usersHandler.CreateUser);
router.delete('/deleteUser/:id', usersHandler.DeleteUser);
router.put('/updateUser/:id', usersHandler.UpdateUser);

export default router;

