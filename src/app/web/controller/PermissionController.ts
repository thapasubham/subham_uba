import { Request, Response } from "express";
import { ResponseApi } from "../../../utils/ApiResponse.js";
import { PermissionService } from "../services/PermissionService.js";
import { parseBody } from "../utils/utils.js";
import { Permission } from "../../../entity/role.js";
import { constants } from "../../../constants/constant.js";
const permissionService = new PermissionService();
export class PermissionController {
  async CreatePermission(req: Request, res: Response) {
    await permissionService.CreatePermission(req.body);

    ResponseApi.WriteResponse(res, {
      status: 201,
      message: "Permission Created",
    });
  }

  async ReadPermissions(req: Request, res: Response) {
    const result = await permissionService.ReadPermissions();

    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }
  async ReadPermission(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await permissionService.ReadPermission(id);

    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }

  async UpdatePermission(req: Request, res: Response) {
    const id = Number(req.params.id);
    const permission = parseBody(req);
    permission.id = id;
    const result = await permissionService.UpdatePermission(permission);
    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }

  async DeletePermission(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await permissionService.DeletePermission(id);

    ResponseApi.WriteResponse(res, {
      status: 204,
      message: constants.PERMISSION_DELETED,
    });
  }
}
