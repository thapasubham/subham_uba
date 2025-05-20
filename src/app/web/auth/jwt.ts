import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { ResponseApi } from "../../../utils/ApiResponse";

export class Auth {

    static isAuthorized(req: Request, res: Response, next: NextFunction) {
        try{
        let token = req.headers.authorization;


        if(!token){
            ResponseApi.WriteResponse(res, { status: 401, message: "Unauthorized" });
            return;
        }

        token = token.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.SECRET);


    const id = req.params.id;
    if (decoded.id !== id) {
      ResponseApi.WriteResponse(res, { status: 401, message: "Unauthorized" });
      return;
    }
    next();}catch(e){
      throw new Error(e);
    }
  }

  static Sign(user: number) {
    const bearerToken = jwt.sign({ id: user }, process.env.SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user }, process.env.SECRET, {
      expiresIn: "30d",
    });
    return { bearerToken: bearerToken, refreshToken: refreshToken };
  }
}
