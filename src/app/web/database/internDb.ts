import { AppDataSource } from "../../../data-source.js";
import { Intern } from "../../../entity/intern.js";

const internRepository = AppDataSource.getRepository(Intern);

export class InternDb {
  static async Create(intern: Intern) {
    const result = await internRepository.save(intern);
    return result;
  }

  static async Read(id: number) {
    const result = await internRepository.findOne({
      where: { id: id, isDeleted: false },
      select: { id: true, name: true },
    });
    return result;
  }

  static async Reads() {
    const result = await internRepository.find({
      select: { id: true, name: true },
    });
    return result;
  }

  static async Update(intern: Intern) {
    console.log(intern.id);
    const result = await internRepository.findOneBy({
      id: intern.id,
      isDeleted: false,
    });
    if (result) {
      result.name = intern.name;
      await internRepository.save(result);
      return 1;
    }
    return 0;
  }

  static async Delete(id: number) {
    const intern = await internRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
    if (intern) {
      intern.isDeleted = true;
      await internRepository.save(intern);
      return 1;
    }

    return 0;
  }
}
