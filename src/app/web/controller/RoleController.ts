import { RoleService } from "../services/RoleService.js";
import { ResponseApi } from "../../../utils/ApiResponse";
import { Request, Response } from "express";

const roleService = new RoleService();
export class RoleController {
  async ReadRoles(req: Request, res: Response) {
    const result = await roleService.ReadRoles();

    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }
  async CreateRole(req: Request, res: Response) {
    const role = req.body;

    const result = await roleService.CreateRole(role);

    ResponseApi.WriteResponse(res, { status: 201, data: result });
  }
  async ReadRole(req: Request, res: Response) {
    const roleID = Number(req.params.id);
    console.log(roleID);
    const result = await roleService.ReadRole(roleID);

    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }

  async UpdateRole(req: Request, res: Response) {
    const roleID = Number(req.params.id);
    const permissionId = req.body.permission_id;

    const result = await roleService.UpdateRole(roleID, permissionId);
    ResponseApi.WriteResponse(res, { status: 201, data: result });
  }

  async DeleteRole(req: Request, res: Response) {
    const roleID = Number(req.params.id);
    const result = await roleService.DeleteRole(roleID);
    ResponseApi.WriteResponse(res, { status: 204, data: result });
  }
}
