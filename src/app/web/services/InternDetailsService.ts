import { internShipDetails } from "../../../entity/user.js";
import { DetailsDB } from "../database/internDetails.db.js";
export class InternDetailsService {
  async ReadIntern(
    limit?: number,
    offset?: number,
    id?: number
  ): Promise<internShipDetails[] | internShipDetails> {
    if (typeof id === "number") {
      const result = await DetailsDB.GetDetail(id);
      return result;
    }

    if ((limit as number) >= 0 && (offset as number) >= 0) {
      const result = await DetailsDB.GetDetails(limit, offset);
      return result;
    }
  }

  async CreateIntern(detail: internShipDetails) {
    const result = await DetailsDB.CreateDetails(detail);
    return result;
  }
  async UpdateIntern(detail: internShipDetails) {
    const result = await DetailsDB.UpdateDetails(detail);
    return result;
  }
  async Certify(id: number) {
    const result = await DetailsDB.Certify(id);
    return result;
  }
}
