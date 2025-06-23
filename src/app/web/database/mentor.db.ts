import { AppDataSource } from "../../../data-source.js";
import { Mentor } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { PasswordHasher } from "../auth/hash.js";
import { Auth } from "../auth/authorization.js";
import { HttpError } from "../middleware/error.js";
import { constants } from "../../../constants/constant.js";
import { RolesDB } from "./roles.db.js";
import { DEFAULT_ROLE } from "../../../types/permission.types.js";

const repository = AppDataSource.getRepository(Mentor);
export class MentorDb {
  static async CreateMentor(mentor: Mentor) {
    mentor.role = await RolesDB.getrolebyname(DEFAULT_ROLE);
    if (!mentor.password) {
      mentor.password = process.env.DEFAULT_PASSWORD;
    }

    const entity = repository.create(mentor);
    return await repository.save(entity);
  }
  static async ReadMentor(id: number) {
    const result = await repository.findOne({
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

  static async ReadMentors(
    search: string,
    searchby: string,
    limit: number,
    offset: number,
    sort_by: string,
    order: "ASC" | "DESC"
  ) {
    let qb = repository
      .createQueryBuilder("mentor")

      .leftJoinAndSelect("mentor.role", "role");

    if (search && searchby) {
      qb = qb.where(`mentor.${searchby} ILIKE :name`, {
        name: `%${search}%`,
      });
    }

    const result = await qb
      .andWhere("mentor.isDeleted = :deleted", { deleted: false })
      .limit(limit)
      .select([
        "mentor.id",
        "mentor.firstname",
        "mentor.lastname",
        "mentor.email",
        "mentor.phoneNumber",
        "mentor.isverified",
      ])
      .offset(offset)
      .orderBy(sort_by || "mentor.id", order || "ASC")
      .getMany();

    return result;
  }

  static async UpdateMentor(mentor: Mentor) {
    const result = await repository.findOneBy({
      id: mentor.id,
      isDeleted: false,
    });
    if (!result) {
      throw new HttpError(constants.NO_USER, 404);
    }
    result.firstname = mentor.firstname;
    result.lastname = mentor.lastname;
    result.phoneNumber = mentor.phoneNumber;
    result.email = mentor.email;
    result.password = mentor.password;
    result.role = mentor.role;
    await repository.save(result);

    //returns 1 indicating update was successfull
    return 1;
  }

  //returns the status of delete 1 = success, 0 = failed to delete;
  static async DeleteMentor(id: number) {
    const mentor = await repository.findOneBy({ id: id, isDeleted: false });
    if (mentor) {
      mentor.isDeleted = true;
      await repository.save(mentor);
      return 1;
    }

    return 0;
  }

  static async Login(user: login) {
    const result = await repository.findOne({
      where: { email: user.email },
      relations: {
        role: {
          permission: true,
        },
      },
    });
    if (!result) {
      throw new HttpError(constants.NO_USER, 404);
    }

    await PasswordHasher.Compare(user.password, result.password);

    const id = result.id;
    const signed_token = Auth.Sign(id, result.role.id);

    const permissionNames = result.role.permission.map((p) => p.name);
    return { signed_token, permissions: permissionNames, id: result.id };
  }
}
