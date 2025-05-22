import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { ResponseApi } from "../../../utils/ApiResponse";
import { HttpError } from "../middleware/error";

export class Auth {
  static isAuthorized(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;

      if (!token) {
        ResponseApi.WriteResponse(res, {
          status: 401,
          message: "Unauthorized",
        });
        return;
      }

      token = token.split(" ")[1];
      const decoded: any = Auth.Decode(token);

      const id = req.params.id;
      if (decoded.id !== id && decoded.role != "admin") {
        console.log(typeof decoded.role);
        ResponseApi.WriteResponse(res, {
          status: 401,
          message: "Unauthorized",
        });
        return;
      }
      next();
    } catch (e) {
      throw new HttpError(e.message || "Unauthorized", 401);
    }
  }

  static Sign(user: number, role: string) {
    const bearerToken = jwt.sign({ id: user, role: role }, process.env.SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user }, process.env.SECRET, {
      expiresIn: "30d",
    });
    return { bearerToken: bearerToken, refreshToken: refreshToken };
  }

  static Decode(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
}
