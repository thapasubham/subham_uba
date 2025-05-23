import { AppDataSource } from "../../../data-source.js";
import { User } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { PasswordHasher } from "../auth/hash.js";
import { Auth } from "../auth/authorization.js";
import { HttpError } from "../middleware/error.js";

const userRepository = AppDataSource.getRepository(User);

export class UserDb {
  static async Createuser(user: User) {
    user.password = await PasswordHasher.Hash(user.password);
    return await userRepository.save(user);
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
    if (!result) {
      throw new HttpError("User doesn't exists", 404);
    }
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

  static async UpdateUser(user: User) {
    console.log(user.id);
    let result = await userRepository.findOneBy({
      id: user.id,
      isDeleted: false,
    });
    if (!result) {
      throw new HttpError("User doesn't exists", 404);
    }
    result = { ...user };
    await userRepository.save(result);
    return 1;
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
      throw new HttpError("User doesn't exists", 404);
    }

    await PasswordHasher.Compare(user.password, result.password);

    const id = result.id;
    return Auth.Sign(id, result.role.name);
  }
}
