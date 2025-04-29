import { User } from "../../cli/abstraction/User";
import { user } from "../../types/user.type";
import { saveUser } from "../../utils/db";
import { getIndex, readFile, SaveUser, userExists } from "../../utils/files";

export class UserService implements User {
  async CreateUser(user: user): Promise<user> {
    const users = readFile();

    users.push(user);

    await SaveUser(users);

    return user;
  }
  async DeleteUser(id: number): Promise<user> {
    const userData: user[] = readFile();

    const index = userData.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    const deletedUser = userData.splice(index, 1)[0];
    await SaveUser(userData);
    return deletedUser;
  }
  async ReadUsers(id?: number): Promise<user[]> {
    const users: user[] = readFile();
    console.log(typeof id);
    if (id) {
      const index = getIndex(id);
      return users.slice(index, index + 1);
    }

    return users;
  }
  async Update(user: user): Promise<user> {
    const userData: user[] = readFile();

    const index = userData.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error(`User with ID ${user.id} not found`);
    }

    userData[index] = user;
    SaveUser(userData);
    return user;
  }
}
