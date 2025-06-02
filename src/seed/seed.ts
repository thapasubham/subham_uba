import { RolesDB } from "../app/web/database/roles.db.js";
import { constants } from "../constants/constant.js";
import { DEFAULT_ROLE } from "../types/permission.types.js";

export class Seed {
  static async RoleSeed() {
    const existingRole = await RolesDB.getrolebyname(DEFAULT_ROLE);

    if (existingRole) {
      console.log("role already exists:", existingRole);
    } else {
      console.log(`${DEFAULT_ROLE} role not found. Creating...`);
      const newRole = await RolesDB.CreateRole({ name: DEFAULT_ROLE });
      console.log("role created:", newRole);
    }
  }
}
