import { user } from "../types/user.type.js";
import * as fs from 'fs';
import { User } from "../types/UserController.js";

const path ="user.txt"
function readFile(){
    if(!fs.existsSync(path)){
fs.writeFileSync(path,'')
    }
const fileDate = fs.readFileSync(path, 'utf-8');
return fileDate;
}

export class Users extends User{
     CreateUser(user: user): void  {
        const name =`${user.firstname} ${user.lastname}`
        
            if(userExists(user)){
              console.log("userAlready Exists");
            }
            else{
            fs.appendFileSync(path,  name+"\n");
            console.log(`User ${user.firstname} ${user.lastname} added!`);
            }
    }
     DeleteUser(user: user): void {
      console.log(user)
      console.log(getIndex(user))
    }
    ReadUser(): void {
        const fileDate = readFile().trim();
        console.log(fileDate);
    }
    Update(oldUser: user, user: user):  void{
        console.log(oldUser, user)

    }
    

}

function getIndex(uname:user){
    const fileDate = readFile().split("\n")
    let index =-1
    for(let i =0; i<fileDate.length; i++){
        if(fileDate[i].split(" ").slice(0,1).includes(uname.firstname)){
            index = i;
            break;
        }
    }
   
    return index
 }
 function userExists(user: user){
    const fileDate = readFile().split("\n");
    
    return fileDate.includes(user.firstname)?true:false;
}