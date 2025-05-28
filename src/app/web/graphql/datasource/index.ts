import { InternDetailsService } from "../../services/InternDetailsService.js";
import { InternService } from "../../services/InternService.js";
import { MentorService } from "../../services/MentorService.js";
import { PermissionService } from "../../services/PermissionService.js";
import { RoleService } from "../../services/RoleService.js";
import { UserService } from "../../services/UserService.js";

export const dataSource = {
  userService: new UserService(),
  internService: new InternService(),
  detailsService: new InternDetailsService(),
  mentorService: new MentorService(),
  roleService: new RoleService(),
  permissionService: new PermissionService(),
};
