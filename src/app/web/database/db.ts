import { off } from "process";
import { AppDataSource } from "../../../data-source";
import { user } from "../../../entity/user";

const userRepository = AppDataSource.getRepository(user);

export class DataBase {
  static async Createuser(user: user) {
    const result = await userRepository.save(user);
    console.log(result.intern);
    return result;
  }

  static async ReadUser(id: number) {
    const result = await userRepository.findOneBy({ id: id });
    return result;
  }

  static async ReadUsers(limit: number, offset: number) {
    const result = await userRepository.find({
      where: { isDeleted: false },
      skip: offset,
      take: limit,
      relations: ["intern"],
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
}
