import { NextFunction, Response } from "express";
import { responseType, ResponseApi } from "../../../utils/ApiResponse.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: responseType<string> = {
    message: err.message || "Internal Server Error",
    status: 500,
  };

  return ResponseApi.WriteError(res, response);
}
