import { Request, Response, NextFunction } from "express";
import { InternshipDetail, user } from "../../../entity/user.js";
import { responseType, ResponseApi } from "../../../utils/ApiResponse.js";

export function validate(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const user: user = {
    id: req.body.id ? req.body.id : 0,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    intern: req.body.intern_id,
  };

  if (!(user.firstname && user.lastname)) {
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
