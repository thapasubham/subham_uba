import { AppDataSource } from "../../../data-source.js";
import { internShipDetails } from "../../../entity/user.js";

const internRepository = AppDataSource.getRepository(internShipDetails);

export class DetailsDB {
  static async CreateDetails(detail: internShipDetails) {
    const result = await internRepository.save(detail);
    return result;
  }

  static async GetDetails() {
    const result = await internRepository.find({
      relations: {
        mentor: true,
        user: true,
        intern: true,
      },
      select: {
        intern: {
          name: true,
        },
        mentor: { firstname: true, lastname: true, role: true },
        user: {
          id: true,
          firstname: true,
          lastname: true,
        },
      },
    });
    return result;
  }

  static async GetDetail(id: number) {
    const result = await internRepository.findOne({
      where: { id: id },
      relations: {
        mentor: true,
        user: true,
        intern: true,
      },
    });
    return result;
  }
  static async UpdateDetails(detail: internShipDetails) {
    let result = await internRepository.findOne({
      where: {
        id: detail.id,
      },
    });
    if (result) {
      result = detail;
      await internRepository.save(result);
    }
    return result;
  }

  static async Certify(id: number) {
    const detail = await internRepository.findOneBy({
      id: id,
      isCertified: false,
    });
    if (detail) {
      detail.isCertified = true;
      await internRepository.save(detail);
      return 1;
    }

    return 0;
  }
}
