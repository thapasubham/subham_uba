import { Request, Response } from "express";
import { user } from "../../types/user.type.js";
import { readFile, userExists, SaveUser, getIndex } from "../../utils/files.js";
import { responseType, WriteResponse } from "../../utils/ApiResponse.js";

import { UserService } from "../services/UserService.js";
import { saveUser } from "../../utils/db.js";
import { off } from "process";
const userService = new UserService();
export class UserController {
  async CreateUser(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };
    const data: user[] = readFile();

    const bodyData: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id: Date.now(),
    };

    await userService.CreateUser(bodyData);
    response.status = 201;
    response.message = "User Created";

    WriteResponse(res, response);
  }

  async GetUsers(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };
    const page = req.query.page
      ? parseInt(req.query.page as string)
      : undefined;
    const offset = req.query.offset
      ? parseInt(req.query.offset as string)
      : undefined;
    const user = await userService.ReadUsers(page, offset);

    response.data = user;
    response.status = 200;

    WriteResponse(res, response);
  }

  async GetUser(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };

    const user = await userService.ReadUsers(parseInt(req.params.id));
    console.log(user);
    response.status = 200;
    response.data = user;

    WriteResponse(res, response);
  }

  async UpdateUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    const id = parseInt(req.params.id);
    const userData: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id: id,
    };

    await userService.Update(userData);
    response.message = "User Updated";
    response.status = 201;

    WriteResponse(res, response);
  }

  async DeleteUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    await userService.DeleteUser(parseInt(req.params.id));
    response.status = 204;
    response.message = "User Deleted";

    WriteResponse(res, response);
  }
}
