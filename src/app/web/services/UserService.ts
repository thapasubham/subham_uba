import { User } from "../../../abstraction/User.js";
import { user } from "../../../types/user.type.js";
import { DataBase } from "../db/db.js";

export class UserService implements User {
  async CreateUser(user: user): Promise<user> {
    const createdUser: user = await DataBase.saveUser(user);

    return createdUser;
  }
  async DeleteUser(id: number): Promise<number> {
    const del = await DataBase.deleteUser(id);

    return del;
  }
  async ReadUsers(
    page?: number,
    offset?: number,
    id?: number
  ): Promise<user[]> {
    if (typeof id === "number") {
      const user = await DataBase.readUserbyId(id);
      return user;
    }

    if ((page as number) >= 0 && (offset as number) >= 0) {
      const users: user[] = await DataBase.readUser(
        page as number,
        offset as number
      );

      return users;
    } else {
      return [];
    }
  }

  async Update(user: user): Promise<number> {
    const result = await DataBase.updateUser(user);
    return result;
  }
}
