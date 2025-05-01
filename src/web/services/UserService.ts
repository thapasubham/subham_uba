import { off } from "process";
import { User } from "../../cli/abstraction/User";
import { user } from "../../types/user.type";
import {
  deleteUser,
  readUser,
  readUserbyId,
  saveUser,
  updateUser,
} from "../../utils/db";
import { getIndex, readFile, SaveUser, userExists } from "../../utils/files";

export class UserService implements User {
  async CreateUser(user: user): Promise<user> {
    const createdUser: user = await saveUser(user);

    return createdUser;
  }
  async DeleteUser(id: number): Promise<number> {
    const del = await deleteUser(id);

    return del;
  }
  async ReadUsers(
    page?: number,
    offset?: number,
    id?: number
  ): Promise<user[]> {
    if (id) {
      const user = await readUserbyId(id);
      return user;
    } 

    if (page && offset) {
      const users: user[] = await readUser(page, offset);

      return users;
    }
    return [];
  }

  async Update(user: user): Promise<user> {
    await updateUser(user);
    return user;
  }
}
