import { AppDataSource } from "../../../data-source.js";
import { Intern } from "../../../entity/user.js";

const userRepository = AppDataSource.getRepository(Intern);

export class DataBaseIntern {
  static async Create(intern: Intern) {
    const result = await userRepository.save(intern);
    return result;
  }

  static async Read(id: number) {
    const result = await userRepository.findOne({
      where: { id: id, isDeleted: false },
      select: { id: true, name: true },
    });
    return result;
  }

  static async Reads() {
    const result = await userRepository.find({
      select: { id: true, name: true },
    });
    return result;
  }

  static async Update(intern: Intern) {
    console.log(intern.id);
    const result = await userRepository.findOneBy({
      id: intern.id,
      isDeleted: false,
    });
    if (result) {
      result.name = intern.name;
      await userRepository.save(result);
      return 1;
    }
    return 0;
  }

  static async Delete(id: number) {
    const intern = await userRepository.findOneBy({ id: id, isDeleted: false });
    if (intern) {
      intern.isDeleted = true;
      await userRepository.save(intern);
      return 1;
    }

    return 0;
  }
}
