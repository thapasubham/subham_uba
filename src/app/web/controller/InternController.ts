import { Request, Response } from "express";

import { ResponseApi, responseType } from "../../../utils/ApiResponse.js";
import { parseBody } from "../utils/utils.js";
import { InternService } from "../services/InternService.js";
import {Intern} from "../../../entity/intern";

const internService = new InternService();

export class InternController {
  async CreateIntern(req: Request, res: Response) {
    const response: responseType<Intern> = {
      message: "",
      status: 201,
    };

    const intern: Intern = parseBody(req);
    await internService.CreateIntern(intern);

    response.message = "Intern Created";
    ResponseApi.WriteResponse(res, response);
  }

  async GetInterns(req: Request, res: Response) {
    const response: responseType<Intern[]> = {
      status: 200,
    };

    const interns = (await internService.ReadIntern()) as Intern[];

    if (interns.length === 0) {
      response.message = "No interns found";
      response.status = 404;
    } else {
      response.data = interns;
    }

    ResponseApi.WriteResponse(res, response);
  }

  async GetIntern(req: Request, res: Response) {
    const response: responseType<Intern> = {
      status: 200,
    };

    const id = parseInt(req.params.id);
    const intern = (await internService.ReadIntern(id)) as Intern;

    if (!intern) {
      response.status = 404;
      response.message = "Intern not found";
    } else {
      response.data = intern as Intern;
    }

    ResponseApi.WriteResponse(res, response);
  }

  async UpdateIntern(req: Request, res: Response) {
    const response: responseType<Intern> = {
      message: "",
      status: 200,
    };

    const internData: Intern = parseBody(req);
    internData.id = parseInt(req.params.id);

    const result = await internService.UpdateIntern(internData);

    if (result === 0) {
      response.status = 404;
      response.message = "Failed to update intern";
    } else {
      response.message = "Intern updated";
    }

    ResponseApi.WriteResponse(res, response);
  }

  async DeleteIntern(req: Request, res: Response) {
    const response: responseType<Intern> = {
      message: "",
      status: 200,
    };

    const id = parseInt(req.params.id);
    const result = await internService.DeleteIntern(id);

    if (result === 0) {
      response.status = 400;
      response.message = "Failed to delete intern";
    } else {
      response.status = 204;
      response.message = "Intern deleted";
    }

    ResponseApi.WriteResponse(res, response);
  }
}
