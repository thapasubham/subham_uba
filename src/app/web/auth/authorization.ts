import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { HttpError } from "../middleware/error.js";
import { constants } from "../../../constants/constant.js";
import { RolesDB } from "../database/roles.db.js";

export class Auth {
  static isAuthorized(permission: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const decoded_token: any = await Auth.getDecodedToken(req);
        console.log(decoded_token);
        const id = Number(req.params.id);
        const decodedID = Number(decoded_token.id);
        const role = decoded_token.role;

        const rolePermission = await Auth.getPermission(role, permission);
        const idMatch = Auth.matchID(id, decodedID);
        console.log(id, decodedID);
        console.log(idMatch, rolePermission);
        console.log(decodedID === id);
        if (idMatch || rolePermission) {
          return next();
        }
        throw new HttpError(
          constants.UNAUTHORIZED_MSG,
          constants.UNAUTHORIZED_STAUTS
        );
      } catch (e) {
        throw new HttpError(e.message, constants.UNAUTHORIZED_STAUTS);
      }
    };
  }

  static Sign(user: number, role: number) {
    const bearerToken = jwt.sign({ id: user, role: role }, process.env.SECRET, {
      expiresIn: constants.BEARER_JWT_EXP as any,
    });
    const refreshToken = jwt.sign({ id: user }, process.env.SECRET, {
      expiresIn: constants.REFRESH_JWT_EXP as any,
    });
    return { bearerToken: bearerToken, refreshToken: refreshToken };
  }

  static async Decode(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }

  static async getDecodedToken(req: Request) {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new HttpError(
        constants.UNAUTHORIZED_MSG,
        constants.UNAUTHORIZED_STAUTS
      );
    }
    token = token.split(" ")[1];
    const decoded = await Auth.Decode(token);
    return decoded;
  }

  static async getPermission(roleID: number, permission: string) {
    if (!roleID) {
      throw new Error("JWT invalid");
    }
    console.log(roleID);
    const roles = await RolesDB.ReadRole(roleID);
    const permissions = roles.permission;
    console.log(permissions);
    const rolePermission = permissions.some((p) => p.name == permission);
    return rolePermission;
  }
  static matchID(id: number, decodedID: number) {
    return id === decodedID;
  }
}
