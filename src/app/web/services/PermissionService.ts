import {Permission} from "../../../entity/role";
import {permissionDB} from "../database/permission.db";

export class PermissionService {
    async CreatePermission(permission: Permission) {
        return await permissionDB.CreatePermission(permission);
    }

    async ReadPermissions() {
        return await permissionDB.ReadPermissions();
    }

    async ReadPermission(id: number) {
        return await permissionDB.ReadPermission(id);
    }

    async UpdatePermission(permission: Permission) {

        return await permissionDB.UpdatePermission(permission);
    }

    async DeletePermission(id: number) {
        return await permissionDB.DeletePermission(id);

    }
}