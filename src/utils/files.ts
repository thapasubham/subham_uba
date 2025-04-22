import chalk from 'chalk';
import * as fs from 'fs'
import {user} from '../types/user.type.js'
const path ="user.json"


export function readFile(){
    if(!fs.existsSync(path)){
    fs.writeFileSync(path, "[]")
    return [] ;
    }
    try{
    const fileDate = fs.readFileSync(path, 'utf-8');
    const userData: user[] = JSON.parse(fileDate);
     return userData;
    }

    catch(error){
    console.log(chalk.red("No user Exists: ", error))
    return [];
    }
}

export function SaveUser(data: user[]){
    try{
    fs.writeFileSync(path,  JSON.stringify(data, null, 1));
    }catch(error){
        console.error(chalk.red("Error saving user: ", error))
    }
}


export function userExists(user: user){
    const datas: user[] = readFile();

    for(let i=0;i<datas.length;i++){
        
    if(datas[i].firstname===user.firstname&&datas[i].lastname===user.lastname){
         return true;
    }
    }
    return false;
}