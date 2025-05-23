import { Intern } from "../../../entity/intern.js";
import { InternDb } from "../database/intern.db.js";

export class InternService {
  /**
   *
   * @param {intern} [Intern]
   */
  async CreateIntern(intern: Intern) {
    const result = await InternDb.Create(intern);
    return result;
  }

  /**
   *
   * @param {id} [number] Provide if you want details of a id
   * //return intern list when number isn't provided
   *
   */
  async ReadIntern(id?: number): Promise<Intern[] | Intern> {
    if (id) {
      return await InternDb.Read(id);
    }
    const result = await InternDb.Reads();
    return result;
  }

  async UpdateIntern(intern: Intern) {
    const result = await InternDb.Update(intern);
    return result;
  }

  async DeleteIntern(id: number) {
    return await InternDb.Delete(id);
  }
}
