import { EntityTarget, FindOptionsWhere, Not, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source.js";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { HttpError } from "./error.js";

export class ValidateUnique<T> {
  private repository: Repository<T>;
  constructor(repository: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(repository);
  }

  isUnique = async (req: Request, res: Response, next: NextFunction) => {
    const { id, email, phoneNumber } = req.body;
    const c_id = Number(id);
    if (!email || !phoneNumber) {
      throw new HttpError("Email and phone number are required", 404);
    }

    const duplicateEmail = await this.UniqueEmail(email, c_id);
    const duplicatePhone = await this.UniquePhone(phoneNumber, c_id);
    if (duplicateEmail || duplicatePhone) {
      throw new HttpError("Emal or phonenumber already exists", 409);
    }

    next();
  };

  async UniqueEmail(email: string, id?: number) {
    const duplicate = await this.repository.findOne({
      where: {
        id: Not(id),
        email,
      },
    } as any);
    return duplicate ? true : false;
  }
  async UniquePhone(phoneNumber: string, id?: number) {
    const duplicate = await this.repository.findOne({
      where: {
        id: Not(id),
        phoneNumber,
      },
    } as any);
    return duplicate ? true : false;
  }
}
