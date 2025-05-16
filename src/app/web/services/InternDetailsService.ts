import { internShipDetails } from "../../../entity/user.js";
import { DetailsDB } from "../database/interndetails.db.js";

export class InternDetailsService {
  async ReadIntern(id?: number) {
    if (id) {
      const result = await DetailsDB.GetDetail(id);
      return result;
    }
    const result = await DetailsDB.GetDetails();
    return result;
  }

  async CreateIntern(detail: internShipDetails) {
    const result = await DetailsDB.CreateDetails(detail);
    return result;
  }
  async UpdateIntern(detail: internShipDetails) {
    const result = await DetailsDB.CreateDetails(detail);
    return result;
  }
  async Certify(id: number) {
    const result = await DetailsDB.Certify(id);
    return result;
  }
}
