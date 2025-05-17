import { Request, Response } from "express";
import { internShipDetails } from "../../../entity/user.js";
import { ResponseApi, responseType } from "../../../utils/ApiResponse.js";
import { InternDetailsService } from "../services/InternDetailsService.js";
import { parseBody } from "../utils/utils.js";

const internService = new InternDetailsService();
export class InternDetailsController {
  async CreateIntern(req: Request, res: Response) {
    const response: responseType<internShipDetails[]> = {
      message: "",
      status: 200,
    };

    const bodyData: internShipDetails = parseBody(req);

    await internService.CreateIntern(bodyData);

    response.status = 201;
    response.message = "Intern Details Created";

    ResponseApi.WriteResponse(res, response);
  }

  async GetIntern(req: Request, res: Response) {
    const response: responseType<internShipDetails> = {
      status: 200,
    };

    const id = Number(req.params.id);
    const detail = (await internService.ReadIntern(id)) as internShipDetails;

    if (!detail) {
      response.message = "No Data were found";
      response.status = 404;
    } else {
      response.data = detail;
    }

    ResponseApi.WriteResponse(res, response);
  }
  async GetInterns(req: Request, res: Response) {
    const response: responseType<internShipDetails[]> = {
      status: 200,
    };

    const details =
      (await internService.ReadIntern()) as unknown as internShipDetails[];

    if (details.length === 0) {
      response.message = "No Data were found";
      response.status = 404;
    } else {
      response.data = details;
    }

    ResponseApi.WriteResponse(res, response);
  }

  async Certify(req: Request, res: Response) {
    const response: responseType<String> = {
      message: "",
      status: 200,
    };

    const result = await internService.Certify(parseInt(req.params.id));

    if (result === 0) {
      response.status = 400;
      response.message = "Failed to update";
    } else {
      response.status = 200;
      response.message = "Certification status updated";
    }
    ResponseApi.WriteResponse(res, response);
  }
}
