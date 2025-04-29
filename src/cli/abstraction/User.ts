import { user } from "../../types/user.type.js";

export abstract class User {
  abstract CreateUser(user: user): Promise<boolean>;
  abstract DeleteUser(query: number ): Promise<boolean>;
  abstract ReadUsers(): Promise<user[]>;
  abstract Update(user: user): Promise<boolean>;
}
