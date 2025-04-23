import { Response } from "express";

export interface responseType<T>{
    data? : T,
    status: number
    message: string
}

export function WriteResponse<T>(res: Response, v: responseType<T> ){

    res.status(v.status).send(v.data?v.data:v.message);
}

export function WriteError(res: Response,  e: any){

    res.status(e.status).send({"message" : e.message});

}