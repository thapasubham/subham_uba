import { Request, Response } from "express";
import { user } from "../../../types/user.type.js";
import { responseType, WriteResponse } from "../../utils/ApiResponse.js";

import { UserService } from "../services/UserService.js";

const userService = new UserService();
export class UserController {
  async CreateUser(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };

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
    const page = parseInt(req.query.page as string);
    const offset = parseInt(req.query.offset as string);
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

    const id = parseInt(req.params.id);
    const user = await userService.ReadUsers(0, 0, id);

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

    const id = await userService.DeleteUser(parseInt(req.params.id));

    if (id === 0) {
      response.status = 400;
      response.message = "Failed to delete user";
    } else {
      response.status = 204;
      response.message = "User Deleted";
    }
    WriteResponse(res, response);
  }
}
