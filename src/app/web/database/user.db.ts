import { AppDataSource } from "../../../data-source.js";
import { User } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { PasswordHasher } from "../auth/hash.js";
import { Auth } from "../auth/authorization.js";
import { HttpError } from "../middleware/error.js";
import { constants } from "../../../constants/constant.js";
import { DEFAULT_ROLE } from "../../../types/permission.types.js";
import { RolesDB } from "./roles.db.js";

const userRepository = AppDataSource.getRepository(User);

export class UserDb {
  static async Createuser(user: User) {
    user.role = await RolesDB.getrolebyname(DEFAULT_ROLE);
    const entity = userRepository.create(user);
    return await userRepository.save(entity);
  }

  static async ReadUser(id: number) {
    const result = await userRepository.findOne({
      where: { id: id, isDeleted: false },
      relations: ["role", "role.permission"],
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        role: {
          id: true,
          name: true,
          permission: true,
        },
        password: false,
        isDeleted: false,
      },
    });
    if (!result) {
      throw new HttpError(constants.NO_USER, 404);
    }
    console.log(result);
    return result;
  }

  static async ReadUsers(limit: number, offset: number) {
    const result = await userRepository.find({
      where: { isDeleted: false },
      relations: ["role"],
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        role: {
          id: true,
          name: true,
        },
        password: false,
        isDeleted: false,
      },
      skip: offset,
      take: limit,
    });
    return result;
  }

  static async UpdateUser(user: User) {
    let result = await userRepository.findOneBy({
      id: user.id,
      isDeleted: false,
    });
    if (!result) {
      throw new HttpError(constants.NO_USER, 404);
    }
    result.firstname = user.firstname;
    result.lastname = user.lastname;
    result.phoneNumber = user.phoneNumber;
    result.email = user.email;
    result.password = user.password;
    result.role = user.role;
    const db_result = await userRepository.save(result);
    return db_result;
  }

  static async DeleteUser(id: number) {
    const user = await userRepository.findOneBy({ id: id, isDeleted: false });

    //if the user with given if found
    if (user) {
      user.isDeleted = true;
      await userRepository.save(user);
      //return 1 if it was deleted
      return 1;
    }

    //returns 0 if failed to delete
    return 0;
  }

  static async Login(user: login) {
    const result = await userRepository.findOne({
      where: { email: user.email },
      relations: {
        role: true,
      },
    });

    if (!result) {
      throw new HttpError(constants.NO_USER, 404);
    }

    await PasswordHasher.Compare(user.password, result.password);

    const id = result.id;
    return Auth.Sign(id, result.role.id);
  }
}
