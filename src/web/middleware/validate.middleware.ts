import { Request, Response, NextFunction } from "express";
import { getIndex, userExists } from "../../utils/files";
import { user } from "../../types/user.type";
import {
  responseType,
  WriteError,
  WriteResponse,
} from "../../utils/ApiResponse";

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
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  console.log(firstname, lastname);
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const index = getIndex(parseInt(req.params.id));

  if (index === -1) {
    response.message = "User doesn't Exists";
    response.status = 404;
    return WriteError(res, response);
  }

  next();
}
