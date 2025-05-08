import { Response } from "express";

export interface responseType<T> {
  data?: T;
  status: number;
  message: string;
}

export function WriteResponse<T>(res: Response, v: responseType<T>) {
  return res.status(v.status).send(v.data ? v.data : { message: v.message });
}

export function WriteError<T>(res: Response, e: responseType<T>) {
  return res.status(e.status).send({ message: e.message });
}
