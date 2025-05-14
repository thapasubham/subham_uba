import { Request, Response } from "express";
import { user } from "../../../entity/user.js";
import { ResponseApi, responseType } from "../../../utils/ApiResponse.js";

import { UserService } from "../services/UserService.js";
import { parseBody } from "../utils/utils.js";

const userService = new UserService();
export class UserController {
  async CreateUser(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };

    const bodyData: user = parseBody(req);

    await userService.CreateUser(bodyData);

    response.status = 201;
    response.message = "User Created";

    ResponseApi.WriteResponse(res, response);
  }

  async GetUsers(req: Request, res: Response) {
    const response: responseType<user[]> = {
      status: 200,
    };
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const user = (await userService.ReadUsers(limit, offset)) as user[];

    if (user.length === 0) {
      response.message = "No User exists";
      response.status = 404;
    } else {
      response.data = user;
      response.status = 200;
    }
    ResponseApi.WriteResponse(res, response);
  }

  async GetUser(req: Request, res: Response) {
    const response: responseType<user[]> = {
      status: 200,
    };

    const id = parseInt(req.params.id);
    const user = await userService.ReadUsers(0, 0, id);

    if (!user) {
      response.status = 404;
      response.message = "User not found";
    } else {
      response.status = 200;
      response.data = user;
    }
    ResponseApi.WriteResponse(res, response);
  }

  async UpdateUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    const id = parseInt(req.params.id);
    const userData: user = parseBody(req);

    const result = await userService.Update(userData);

    if (result === 0) {
      response.message = "Failed to update user";
      response.status = 404;
    } else {
      response.message = "User Updated";
      response.status = 200;
    }
    ResponseApi.WriteResponse(res, response);
  }

  async DeleteUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    const result = await userService.DeleteUser(parseInt(req.params.id));

    if (result === 0) {
      response.status = 400;
      response.message = "Failed to delete user";
    } else {
      response.status = 204;
      response.message = "User Deleted";
    }
    ResponseApi.WriteResponse(res, response);
  }
}
