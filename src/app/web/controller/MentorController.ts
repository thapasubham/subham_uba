import { Request, Response } from "express";
import { Mentor } from "../../../entity/user.js";
import { ResponseApi, responseType } from "../../../utils/ApiResponse.js";

import { parseBody } from "../utils/utils.js";
import { MentorService } from "../services/MentorService.js";

const mentorService = new MentorService();
export class MentorController {
  async CreateMentor(req: Request, res: Response) {
    const response: responseType<Mentor> = {
      message: "",
      status: 200,
    };

    const bodyData: Mentor = parseBody(req);

    await mentorService.CreateMentor(bodyData);

    response.status = 201;
    response.message = "Mentor Created";

    ResponseApi.WriteResponse(res, response);
  }

  async GetMentors(req: Request, res: Response) {
    const response: responseType<Mentor[]> = {
      status: 200,
    };
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const user = (await mentorService.ReadMentors(limit, offset)) as Mentor[];

    response.data = user;
    response.status = 200;

    ResponseApi.WriteResponse(res, response);
  }

  async GetMentor(req: Request, res: Response) {
    const response: responseType<Mentor> = {
      status: 200,
    };

    const id = parseInt(req.params.id);
    const user = await mentorService.ReadMentors(0, 0, id);

    response.status = 200;
    response.data = user as Mentor;

    ResponseApi.WriteResponse(res, response);
  }

  async UpdateMentor(req: Request, res: Response) {
    const response: responseType<Mentor> = {
      message: "",
      status: 200,
    };

    const id = parseInt(req.params.id);
    const mentorData: Mentor = parseBody(req);

    mentorData.id = id;
    const result = await mentorService.Update(mentorData);

    if (result === 0) {
      response.message = "Failed to update Mentor";
      response.status = 404;
    } else {
      response.message = "Mentor Updated";
      response.status = 200;
    }
    ResponseApi.WriteResponse(res, response);
  }

  async DeleteMentor(req: Request, res: Response) {
    const response: responseType<Mentor> = {
      message: "",
      status: 200,
    };

    const result = await mentorService.DeleteMentor(parseInt(req.params.id));

    if (result === 0) {
      response.status = 400;
      response.message = "Failed to delete mentor";
    } else {
      response.status = 204;
      response.message = "Mentor Deleted";
    }
    ResponseApi.WriteResponse(res, response);
  }

  async login(req: Request, res: Response) {
    const result = await mentorService.Login(req.body);

    ResponseApi.WriteResponse(res, { status: 200, data: result });
  }
}
