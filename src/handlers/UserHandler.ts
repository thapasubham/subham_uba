import { user } from "../types/user.type.js";
import * as fs from 'fs';
import { User } from "../abstraction/User.js";
import chalk from 'chalk';
const path ="user.json"
function readFile(){
    if(!fs.existsSync(path)){
fs.writeFileSync(path,'')
    }
const fileDate = fs.readFileSync(path, 'utf-8');
return fileDate;
}

export class Users extends User{
    async CreateUser(user: user): Promise<boolean> {
        let data: user[] = [];
        try{ data= JSON.parse(readFile());}
        catch(error){
            data =[]
        }
        user.id = data.length+1;
        if(userExists(user)){
        console.log(chalk.yellowBright("User Already Exists"));
        return false;
        }
        else{
            data.push(user);
            fs.writeFileSync(path,  JSON.stringify(data, null, 2));
            console.log(chalk.greenBright(`User ${user.firstname} ${user.lastname} added!`));
            return true;
        }

    }
     async DeleteUser(query: number|string): Promise<boolean> {
    
      if(query==="all"){
        fs.writeFileSync(path, "")
        console.log(chalk.green("Deleted all Users"))
        return true;
      }
     

      try{
      const userData: user[] = JSON.parse(readFile())
       
      const users = userData.filter((u: any)=>u.id!==query)

      if(userData.length==users.length){
        console.log(chalk.yellow(`The user with id ${query} doesnt exist`))
        return false;
      }else{
        console.log(chalk.green("User Deleted!!"))
      }
      fs.writeFileSync(path, JSON.stringify(users, null, 2))
      return true;
    } catch{
    console.log(chalk.redBright("Couldn't delete user"))
    return false;
    }
    }
    async ReadUser():  Promise<boolean> {
        try{        
            const userdata: user[] = JSON.parse(readFile());
            console.log(chalk.greenBright("ID \tFirstname \tLastname"))
           userdata.forEach((userdata)=>{
            console.log(chalk.blue(`${userdata.id} \t${userdata.firstname} \t${userdata.lastname}`))
           })

        }
        catch(error){
            console.log(chalk.red("No users exists"))
            return false;
        }
        return true;
    }
   async Update(user: user):   Promise<boolean>{
    try{const userData: user[]= JSON.parse(readFile());

        const index = userData.findIndex((u) => u.id === user.id);
       
    if(index ===-1){
    chalk.yellowBright("The user doesn't Exist")
    }

    userData[index] = user;

    if(userExists(user)){
        console.log(chalk.yellowBright("Cannot update user date. \nUser data already Exists"));
        return false;
    }


    fs.writeFileSync(path, JSON.stringify(userData, null, 2))
    console.log(chalk.green("User data update"));
}
    catch(err){
        console.log(err)
        return false;
    }
    return true;
    }
    

}


 function userExists(user: user){
    const fileData = readFile();
    let datas: user[]=[];
    try{ datas= JSON.parse(fileData);}
    catch(error){
        datas =[]
    }

    for(let i=0;i<datas.length;i++){
        
    if(datas[i].firstname===user.firstname&&datas[i].lastname===user.lastname){
         return true;
    }
    }
    return false;
}