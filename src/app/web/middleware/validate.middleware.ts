import { Request, Response, NextFunction } from "express";
import { user } from "../../../entity/user.js";
import { responseType, ResponseApi } from "../../../utils/ApiResponse.js";
import { parseBody } from "../utils/utils.js";

export function validate(req: Request, res: Response, next: NextFunction) {
  const response: responseType<String> = {
    status: 200,
    message: "",
  };

  const user: user = parseBody(req);

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
