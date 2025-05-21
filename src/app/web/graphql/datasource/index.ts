import { InternDetailsService } from "../../services/InternDetailsService.js";
import { InternService } from "../../services/InternService.js";
import { MentorService } from "../../services/MentorService.js";
import { UserService } from "../../services/UserService.js";

export const dataSource = {
  userService: new UserService(),
  internService: new InternService(),
  detailsService: new InternDetailsService(),
  mentorService: new MentorService(),
};
