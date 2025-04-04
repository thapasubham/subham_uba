const fs = require('fs');

const path ="user.txt"

function readFile(){
    if(!fs.existsSync(path)){
fs.writeFileSync(path,'')
    }
const fileDate = fs.readFileSync(path, 'utf-8');
return fileDate;
}

function CreateUser(fname, lname){
    //implement creating a user
    const user =`${fname} ${lname}`

    if(userExists(user)){
    console.log("User with the name already exists!!")
    }
    else{
    fs.appendFileSync(path,  user+"\n");
    console.log(`User ${fname} ${lname} added!`);
    }
}

function ReadUser(){

   const  fileDate = readFile()
    console.log("Displaying the Users");
    console.log(fileDate);

}

function UpdateUser(uname,fname, lname){
    //implement updating a user date
   
    const user = `${fname} ${lname}`
    const fileDate = readFile().split("\n");

    var index =getIndex(user);
   
    if(userExists(user)){
        console.log("Cannot Update the user as the user already Exists!")
    }else{
        fileDate[index]=user;
        fs.writeFileSync(path, fileDate[0]+"\n");
        for(i=1; i<fileDate.length-1;i++){
            fs.appendFileSync(path, fileDate[i]+"\n");
        }
    console.log(`changed ${uname} to ${fname} ${lname}`)
    }
}

function DeleteUser(fname){

    if(fname=="all"){
        fs.writeFileSync(path, '');
        return;
    }
    const fileDate = readFile().split("\n")

    const index = getIndex(fname); 
    fileDate.splice(index, 1);
    console.log(fileDate)
   
    fs.writeFileSync(path, fileDate[0]+"\n");
    for(i=1; i<fileDate.length-1;i++){
        fs.appendFileSync(path, fileDate[i]+"\n");
    }
    console.log(`${fname}`);
 }

 
 function getIndex(uname){
    const fileDate = readFile().split("\n")
    var index =-1
    for(i =0; i<fileDate.length; i++){
        if(fileDate[i].split(" ").slice(0,1).includes(uname)){
            index = i;
            break;
        }
    }
    if(index==-1){
        console.log("The user not found.")
        return;
    }
    return index
 }
function userExists(user){
    const fileDate = readFile().split("\n");

    return fileDate.includes(user)?true:false;
}


module.exports ={CreateUser, DeleteUser, UpdateUser, ReadUser};
