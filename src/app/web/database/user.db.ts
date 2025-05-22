import { AppDataSource } from "../../../data-source.js";
import { user } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { PasswordHasher } from "../auth/hash.js";
import { Auth } from "../auth/jwt.js";

const userRepository = AppDataSource.getRepository(user);

export class DataBase {
  static async Createuser(user: user) {
    const hashedPassword = await PasswordHasher.Hash(user.password);
    user.password = hashedPassword;
    const result = await userRepository.save(user);
    return result;
  }

  static async ReadUser(id: number) {
    const result = await userRepository.findOne({
      where: { id: id, isDeleted: false },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
      },
    });
    return result;
  }

  static async ReadUsers(limit: number, offset: number) {
    const result = await userRepository.find({
      where: { isDeleted: false },
      select: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
    });
    return result;
  }

  static async UpdateUser(user: user) {
    console.log(user.id);
    const result = await userRepository.findOneBy({
      id: user.id,
      isDeleted: false,
    });
    if (result) {
      result.firstname = user.firstname;
      result.lastname = user.lastname;
      result.phoneNumber = user.phoneNumber;
      result.email = user.email;
      await userRepository.save(result);
      return 1;
    }
    return 0;
  }

  static async DeleteUser(id: number) {
    const user = await userRepository.findOneBy({ id: id, isDeleted: false });
    if (user) {
      user.isDeleted = true;
      await userRepository.save(user);
      return 1;
    }

    return 0;
  }

  static async Login(user: login) {
    const result = await userRepository.findOneBy({ email: user.email });
    if (!result) {
      throw new Error("User doesn't exists");
    }

    let checkPassword = PasswordHasher.Compare(user.password, result.password);

    if (!checkPassword) {
      throw new Error("Password doesn't match");
    }

    const id = result.id;
    const token = Auth.Sign(id, result.role.name);
    return token;
  }
}
