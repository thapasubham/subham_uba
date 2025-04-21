import { user } from "../types/user.type.js";
import { User } from "../abstraction/User.js";
import {readFile, userExists, SaveUser} from '../utils/files.js'
import { Logger } from "../utils/Logger.js";
import chalk from "chalk";

export class Users extends User{

    async CreateUser(user: user): Promise<boolean> {
        const data: user[] = readFile();
  
        user.id = data.length+1;
        
        if(userExists(user)){
       Logger.Warn("User Already Exists");
        return false;
        }
        else{
            data.push(user);
          SaveUser(data);
            Logger.Success(`User ${user.firstname} ${user.lastname} added!`);
            return true;
        }

    }
    
     async DeleteUser(query: number|string): Promise<boolean> {
    
      if(query==="all"){
        SaveUser([]);
        Logger.Success("Deleted all Users");
        return true;
      }
     

      try{
      const userData =readFile()
       
      const users = userData.filter((u: any)=>u.id!==query)

      if(userData.length==users.length){
        Logger.Error(`The user with id ${query} doesnt exist`);
        return false;
      }else{
        SaveUser(users);
        Logger.Success("User Deleted!!");
        return true;
      }
    
      
    } catch(error){
    Logger.Error(`Error Deleting user: ${error}`);
    return false;
    }
    }

    async ReadUser():  Promise<boolean> {
        try{        
            const userdata: user[] = readFile();
        //   Logger.Info("ID \tFirstname \tLastname")
         if(userdata.length==0){
            Logger.Warn("No Users Exists")
         }
           userdata.forEach((userdata)=>{
            Logger.Info(`${userdata.id} \t${userdata.firstname} \t${userdata.lastname}`)
           });

        }
        catch(error){
            Logger.Error(`${error}`);
            return false;
        }
        return true;
    }
   async Update(user: user):   Promise<boolean>{
    try{const userData: user[]= readFile();

        const index = userData.findIndex((u) => u.id === user.id);
       
    if(index ===-1){
    chalk.yellowBright("The user doesn't Exist")
    }

    userData[index] = user;

    if(userExists(user)){
        console.log(chalk.yellowBright("Cannot update user date. \nUser data already Exists"));
        return false;
    }

    SaveUser(userData);
    console.log(chalk.green("User data update"));
}
    catch(err){
        console.log(err)
        return false;
    }
    return true;
    }
    

}

