import { ErrorRequestHandler, NextFunction, Response,  } from "express";
import { responseType, WriteError } from "../../utils/ApiResponse";

 export function errorHandler( err: Error, 
    req: Request,
    res: Response,
    next: NextFunction
    ){
        const response: responseType<string> ={
            data: err.name,
            message: err.message ||"Internal Server Error",
            status:500
        };
    
        WriteError(res, response)
        }
