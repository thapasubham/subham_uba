import { Request, response, Response } from "express";
import { user } from "../../types/user.type.js";
import { readFile, userExists, SaveUser } from "../../utils/files.js"
import { responseType, WriteError, WriteResponse } from "../../utils/ApiResponse.js";


export class UserController{

   

    async CreateUser(req: Request, res: Response){
        try{
            const response: responseType<user> ={
                message:"",
                status: 200
            }
            const data: user[] = readFile();
            
            const bodyData: user= req.body;
            bodyData.id= data.length+1
            if(userExists(bodyData)){
            response.status=206;
            response.message ="User already Exists"
               
            } else{
            data.push(bodyData);
            SaveUser(data);
            response.status=201;
            response.message ="User Created"
            }
            WriteResponse(res, response);
        }
        catch(err){
            res.status(500).json({
                "Message": "Internel Server Error"
            });
        }
    }

   async GetUsers(req: Request, res: Response){
    try{
        const response: responseType<user> ={
            message:"",
            status: 200
        }
        const data: user[] = readFile();
        if(data.length===0){
            response.status=204;
            response.message="User not found"
           
        } else{
            response.data=data;
            response.status=200;
        }
        WriteResponse(res, response);
       }catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
       }
    } 

    async GetUser(req: Request, res: Response){
       try{
        const response: responseType<user> ={
            message:"",
            status: 200
        }
        const data: user[] = readFile();
        const user = data.filter((d)=>d.id===parseInt(req.params.id))
       if(user.length===0){
     
        response.message = "No User Found";
        response.status =404
       }else{
        response.status = 200
        response.data=user
        
       }WriteResponse(res ,response );
       }catch(error){
        console.log(error)
        res.status(500).json({
            "Message": "Internal Server Error"

        });
       }
    } 

    async UpdateUser(req: Request, res: Response){
     try{
        const response: responseType<user> ={
            message:"",
            status: 200
        }
        const data: user[] = readFile();
        const id = parseInt(req.params.id);
        const index = data.findIndex((u) => u.id === id);
        const userData: user={
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        id: id
        }   
        if(index===-1){
            response.status =404;
            response.message = "User doesn't Exists";
       
         }else{
            if(userExists(userData)){
                response.status =204;
                response.message ="User Already Exists";
                
            }else{
                 data[index] =userData;
                 SaveUser(data);
                response.message = "User Updated"
                response.status =201;

                }
            }

        WriteResponse(res, response);
     }catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
     }
    }

    async DeleteUser(req: Request, res: Response){
         try{
            const response: responseType<user> ={
                message:"",
                status: 200
            }
             const userData =readFile();
              
             const users = userData.filter((u: user)=>u.id!==parseInt(req.params.id));
       
             if(userData.length==users.length){
             
                response.status=400;
                response.message ="The User doesn't exists."
              
             }else{
               SaveUser(users);
               response.status =204;
               response.message="User Deleted";
                }
            WriteResponse(res, response);
      } catch(err){
        res.status(500).json({
            "Message": "Internal Server Error"

        });
      }
    }
    
}