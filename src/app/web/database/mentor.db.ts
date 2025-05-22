import { AppDataSource } from "../../../data-source.js";
import { Mentor } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { PasswordHasher } from "../auth/hash.js";
import { Auth } from "../auth/jwt.js";

const repository = AppDataSource.getRepository(Mentor);
export class MentorDb {
  static async CreateMentor(mentor: Mentor) {
    const hashedPassword = await PasswordHasher.Hash(mentor.password);
    mentor.password = hashedPassword;
    const result = await repository.save(mentor);
    return result;
  }
  static async ReadMentor(id: number) {
    const result = await repository.findOne({
      where: { id: id, isDeleted: false },
      select: {
        isDeleted: false,
      },
    });
    return result;
  }
  static async ReadMentors(limit: number, offset: number) {
    const result = await repository.find({
      where: { isDeleted: false },
      select: {
        isDeleted: false,
      },
      skip: offset,
      take: limit,
    });
    return result;
  }

  static async UpdateMentor(mentor: Mentor) {
    console.log(mentor.id);
    const result = await repository.findOneBy({
      id: mentor.id,
      isDeleted: false,
    });
    if (result) {
      result.firstname = mentor.firstname;
      result.lastname = mentor.lastname;
      result.phoneNumber = mentor.phoneNumber;
      result.email = mentor.email;
      result.role = mentor.role;
      await repository.save(result);
      return 1;
    }
    return 0;
  }

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
        role: true,
      },
    });
    if (!result) {
      throw new Error("User doesn't exists");
    }
    await PasswordHasher.Compare(user.password, result.password);

    const id = result.id;
    const role = result.role.name;
    const token = Auth.Sign(id, role);
    return token;
  }
}
