import { Request, Response, NextFunction } from "express";
import { getIndex, userExists } from "../../utils/files";
import { user } from "../../types/user.type";
import {
  responseType,
  WriteError,
  WriteResponse,
} from "../../utils/ApiResponse";
import { GetIndex } from "../../utils/db";

export function validate(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const user: user = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!(user.firstname && user.lastname)) {
    response.message = "Missing fields";
    response.status = 400;
    return WriteResponse(res, response);
  }

  if (userExists(user)) {
    response.message = "User Already exists";
    response.status = 409;
    return WriteResponse(res, response);
  }

  next();
}

export function checkID(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const index = GetIndex(parseInt(req.params.id));

  if (index === -1) {
    response.message = "User doesn't Exists";
    response.status = 404;
    return WriteError(res, response);
  }

  next();
}

export function checkQuery(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page);
  const offset = Number(req.query.offset);

  if (page && offset) {
    next();
    return;
  }

  const errorMsg: responseType<string> = {
    status: 404,
    message: "Query not satisfied",
  };

  WriteError(res, errorMsg);
}
