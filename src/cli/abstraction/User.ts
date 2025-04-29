import { user } from "../../types/user.type.js";

export abstract class User {
  abstract CreateUser(user: user): Promise<user>;
  abstract DeleteUser(id: number): Promise<user>;
  abstract ReadUsers(id?: number): Promise<user[]>;
  abstract Update(user: user): Promise<user>;
}
