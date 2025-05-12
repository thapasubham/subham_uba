import { Response } from "express";

export interface responseType<T> {
  data?: T;
  status: number;
  message?: string;
}

export class ResponseApi {
  static WriteResponse<T>(res: Response, v: responseType<T>) {
    res.status(v.status).send(v.data ? v.data : { message: v.message });
  }

  static WriteError<T>(res: Response, e: responseType<T>) {
    res.status(e.status).send({ message: e.message });
  }
}
