import { internRoutes } from "./intern.route.js";
import { internDetailsRoutes } from "./internDetails.route.js";
import { mentorRoutes } from "./mentor.route.js";
import { permissionRoutes } from "./permission.route.js";
import { rolesRoutes } from "./roles.route.js";
import { userRouter } from "./user.route.js";

export default {
  userRouter,
  internRoutes,
  mentorRoutes,
  internDetailsRoutes,
  permissionRoutes,
  rolesRoutes,
};
