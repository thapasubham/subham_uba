import { Intern } from "../../../entity/intern.js";
import { DataBaseIntern } from "../database/intern.db.js";

export class InternService {
  /**
   *
   * @param {intern} [Intern]
   */
  async CreateIntern(intern: Intern) {
    const result = await DataBaseIntern.Create(intern);
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
      return await DataBaseIntern.Read(id);
    }
    const result = await DataBaseIntern.Reads();
    return result;
  }

  async UpdateIntern(intern: Intern) {
    const result = await DataBaseIntern.Update(intern);
    return result;
  }

  async DeleteIntern(id: number) {
    return await DataBaseIntern.Delete(id);
  }
}
