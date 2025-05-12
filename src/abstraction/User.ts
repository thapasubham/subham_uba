import { user } from "../types/user.type.js";

export abstract class User {
  abstract CreateUser(user: user): Promise<user>;
  abstract DeleteUser(id: number): Promise<number>;
  abstract ReadUsers(
    page?: number,
    offset?: number,
    id?: number
  ): Promise<user[] | user>;
  abstract Update(user: user): Promise<number>;
}
