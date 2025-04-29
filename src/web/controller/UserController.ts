import { Request, Response } from "express";
import { user } from "../../types/user.type.js";
import { readFile, userExists, SaveUser, getIndex } from "../../utils/files.js";
import { responseType, WriteResponse } from "../../utils/ApiResponse.js";
import { saveUser } from "../../utils/db.js";

export class UserController {
  CreateUser(req: Request, res: Response) {
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

    console.log(bodyData);

    data.push(bodyData);
    SaveUser(data);
    response.status = 201;
    response.message = "User Created";

    WriteResponse(res, response);
  }

  async GetUsers(req: Request, res: Response) {
    const response: responseType<user[]> = {
      message: "",
      status: 200,
    };
    const data: user[] = readFile();

    response.data = data;
    response.status = 200;

    WriteResponse(res, response);
  }

  async GetUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    const data: user[] = readFile();
    const index = getIndex(parseInt(req.params.id));

    const user = data[index];

    response.status = 200;
    response.data = user;

    WriteResponse(res, response);
  }

  async UpdateUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };
    const data: user[] = readFile();
    const id = parseInt(req.params.id);
    const index = getIndex(id);

    const userData: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id: id,
    };

    data[index] = userData;
    SaveUser(data);
    response.message = "User Updated";
    response.status = 201;

    WriteResponse(res, response);
  }

  async DeleteUser(req: Request, res: Response) {
    const response: responseType<user> = {
      message: "",
      status: 200,
    };

    const userData = readFile();

    const users = userData.filter(
      (u: user) => u.id !== parseInt(req.params.id)
    );

    SaveUser(users);
    response.status = 204;
    response.message = "User Deleted";

    WriteResponse(res, response);
  }
}
