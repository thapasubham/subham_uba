import { Request, Response } from "express";
import { user } from "../../types/user.type.js";
import { readFile, userExists, SaveUser } from "../../utils/files.js"


export class UserController{

    async CreateUser(req: Request, res: Response){
        try{
            const data: user[] = readFile();
            
            const bodyData: user= req.body;
            bodyData.id= data.length+1
            if(userExists(bodyData)){
                res.status(403).json({
                    "Message":"User Already Exists"
                });
            } else{
            data.push(bodyData);
            SaveUser(data);
            res.status(201).json({
                "Message" :"User Created"
            });}
        }
        catch(err){
            res.status(500).json({
                "Message": "Internel Server Error"
            });
        }
    }

   async GetUsers(req: Request, res: Response){
    try{
        const data: user[] = readFile();
        if(data.length===0){
            res.status(204).send({
                "Message": "User not found"
            });
        } else{
        res.status(200).send(data);
        }
       }catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
       }
    } 

    async GetUser(req: Request, res: Response){
       try{
        const data: user[] = readFile();
        const user = data.filter((d)=>d.id===parseInt(req.params.id))
       if(user.length===0){
        res.status(404).json({
            "Message": "User not found"
        });
       }else{
        res.status(200).send(user);
       }
       }catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
       }
    } 

    async UpdateUser(req: Request, res: Response){
     try{
        const data: user[] = readFile();
        const id = parseInt(req.params.id);
        const index = data.findIndex((u) => u.id === id);
        const userData: user={
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        id: id
        }   
        if(index===-1){
        res.status(404).json({
            "Message":"User Doesnt Exists"
        });
         }else{
            if(userExists(userData)){
                res.status(204).json({
                    "Message":"User Already Exists"
                });
            }else{
                 data[index] =userData;
                 SaveUser(data);
                res.status(202).json({
                "Message":"User Updated"
        });
    }
    }
     }catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
     }
    }

    async DeleteUser(req: Request, res: Response){
         try{
             const userData =readFile();
              
             const users = userData.filter((u: user)=>u.id!==parseInt(req.params.id));
       
             if(userData.length==users.length){
             
              res.status(404).json({
                "Message": "The user doesn't exists"
              });
             }else{
               SaveUser(users);
                res.status(204).json({
                "Message" :"User Deleted"
                });
             }
      } catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
      }
    }
    
}