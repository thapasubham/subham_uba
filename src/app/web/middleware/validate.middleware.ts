import { Request, Response, NextFunction } from "express";
import { User } from "../../../entity/user.js";
import { responseType, ResponseApi } from "../../../utils/ApiResponse.js";
import { parseBody } from "../utils/utils.js";
import { login } from "../../../types/login.types.js";
import { Intern } from "../../../entity/intern.js";

export function validate(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const user: User = parseBody(req);

  if (!(user.firstname && user.lastname && user.email && user.phoneNumber)) {
    response.message = "Missing fields";
    response.status = 400;
    ResponseApi.WriteError(res, response);
    return;
  }

  next();
}

export function checkQuery(req: Request, res: Response, next: NextFunction) {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  if (limit >= 0 && offset >= 0) {
    next();
    return;
  }

  const errorMsg: responseType<string> = {
    status: 404,
    message: "Query not satisfied",
  };

  ResponseApi.WriteError(res, errorMsg);
}

export function checkID(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    ResponseApi.WriteError(res, {
      status: 404,
      message: "ID cannot be string",
    });
  }

  next();
}
export function validateIntern(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const intern: Intern = parseBody(req);

  if (!intern.name) {
    response.message = "Missing fields";
    response.status = 400;
    ResponseApi.WriteError(res, response);
    return;
  }

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const user: login = parseBody(req);
  if (!(user.email && user.password)) {
    response.message = "Missing fields";
    response.status = 400;
    ResponseApi.WriteError(res, response);
    return;
  }

  next();
}
