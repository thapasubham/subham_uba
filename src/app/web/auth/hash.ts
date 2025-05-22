import bcrypt from "bcrypt";
export class PasswordHasher {
  static async Hash(password: string): Promise<string> {
    let hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
  }

  static async Compare(password: string, hashedPassword: string) {
    let val = await bcrypt.compare(password, hashedPassword);
    return val;
  }
}
