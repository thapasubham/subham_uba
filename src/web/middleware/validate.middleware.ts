import { Request, Response, NextFunction } from "express";

export function validate(req: Request, res: Response, next: NextFunction){

    if(!(req.body.firstname && req.body.lastname)){
        res.status(406).send({"Message": "Firstname and lastname are both required"});
    } 
    else next();
}