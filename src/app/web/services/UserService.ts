import { User } from "../../../abstraction/User.js";
import { user } from "../../../entity/user.js";
import { DataBase } from "../database/user.db.js";

/**
 * Class to perfrom CRUD operation
 * @example
 * const userService = new UserService();
 */
export class UserService implements User {
  /**
   *
   * Creates new user
   * @param {user} [user] - Pass the user object you want to create
   *
   * @returns {user} - Newly created user.
   *
   * @example
   * const user= {id: 4, firstname: "John", lastname :"Pork"}
   * const result = userService.CreateUser(user);
   *
   */
  async CreateUser(user: user): Promise<user> {
    console.log(user);
    const createdUser: user = await DataBase.Createuser(user);

    return createdUser;
  }

  /**
   *
   * Delete user with id
   * @param {number} [id] - Pass the user object you want to create
   *
   * @returns {number} - Status if deleted or not.
   *
   *
   * @example
   * const result = userService.CreateUser(4);
   * //This returns 1 if the user is deleted and 0 if failed to deleted.
   *
   */
  async DeleteUser(id: number): Promise<number> {
    const del = await DataBase.DeleteUser(id);

    return del;
  }

  /**
   * Returns a list of users or a single user if an ID is provided.
   *
   * @param {number} [limit] - Total number of users to retrieve.
   * @param {number} [offset] - Number of users to skip from the start.
   * @param {number} [id] - The ID of the user to return.
   * @returns {user[]} - The requested users. Always returns array.
   *
   * @example
   * //Get user by Id
   * const user = await userService.ReadUsers(0,0,id);
   * //remember the user is still array
   *
   * //Get users with pagination
   * const users = await userService.ReadUsers(limit, offset);
   */

  async ReadUsers(
    limit?: number,
    offset?: number,
    id?: number
  ): Promise<user[] | user> {
    if (typeof id === "number") {
      const user = await DataBase.ReadUser(id);
      return user;
    }

    if ((limit as number) >= 0 && (offset as number) >= 0) {
      const users: user[] = await DataBase.ReadUsers(
        limit as number,
        offset as number
      );

      return users;
    } else {
      return [];
    }
  }

  async Update(user: user): Promise<number> {
    console.log(user);
    const result = await DataBase.UpdateUser(user);

    return result;
  }
}
