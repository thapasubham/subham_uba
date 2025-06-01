import { HttpError } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { Auth } from "./authorization.js";

export default async function refreshTokenValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.headers.authorization;
    if (!refreshToken || !refreshToken.startsWith("refreshToken ")) {
      throw new HttpError("Cannot validate", 401);
    }
    const result: any = await Auth.getDecodedToken(req);

    res.locals = result;

    next();
  } catch (e) {
    throw new HttpError(e.message);
  }
}
