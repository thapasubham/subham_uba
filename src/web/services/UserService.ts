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
    const users = readFile();

    users.push(user);

    console.log(user);
    await saveUser(user);

    return user;
  }
  async DeleteUser(id: number): Promise<number> {
    await deleteUser(id);
    return id;
  }
  async ReadUsers(
    page?: number,
    offset?: number,
    id?: number
  ): Promise<user[]> {
    console.log(typeof id);
    if (id) {
      const user = await readUserbyId(id);
      return user;
    }

    if (page && offset) {
      const users: user[] = await readUser(page, offset);
      console.log(users);
      return users;
    }
    return [];
  }

  async Update(user: user): Promise<user> {
    await updateUser(user);
    return user;
  }
}
