import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { HttpError } from "../middleware/error.js";
import { constants } from "../../../constants/constant.js";
import { RolesDB } from "../database/roles.db.js";

export class Auth {
  static isAuthorized(permission: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let token = req.headers.authorization;
        if (!token) {
          throw new HttpError(constants.UNAUTHORIZED, 401);
        }

        token = token.split(" ")[1];
        
        const decoded: any = await Auth.Decode(token);
        const id = Number(req.params.id);
        const decodedID = decoded.id;
        const role = decoded.role;

        const rolePermission = await Auth.getPermission(role, permission);
        const idMatch = Auth.matchID(id, decodedID);

        if (idMatch && rolePermission) {
          throw new HttpError(constants.UNAUTHORIZED, 401);
        }
        next();
      } catch (e) {
        throw new HttpError(e.message || "Unauthorized", 401);
      }
    };
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

  static async Decode(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }

  static async getPermission(role: string, permission: string) {
    const permissions = (await RolesDB.ReadRole(role)).permission;

    const rolePermission = permissions.some((p) => p.name === permission);
    return rolePermission;
  }
  static matchID(id: number, decodedID: number) {
    return id === decodedID;
  }
}
