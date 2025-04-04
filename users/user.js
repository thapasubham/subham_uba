const fs = require('fs');

const path ="user.txt"

function readFile(){
    if(!fs.existsSync()){
fs.writeFileSync(path,'')
    }
const fileDate = fs.readFileSync(path, 'utf-8');
return fileDate;
}

function CreateUser(fname, lname){
    //implement creating a user
    const user =`${fname} ${lname}`
const fileDate = readFile();
fs.writeFileSync(path, fileDate+ "\n"+ user);
    console.log(`User ${fname} ${lname} added`);
}

function ReadUser(){
    //reads the data of all existing users\
    const fileDate = readFile();
    console.log("Displaying the Users");
    console.log(fileDate);

}

function UpdateUser(uname,fname, lname){
    //implement updating a user date
   

    console.log(`changed ${uname} to ${fname} ${lname}`)

}

function DeleteUser(fname){
    //implement delete feauture 
    console.log(`${fname}`);
 }

 



module.exports ={CreateUser, DeleteUser, UpdateUser, ReadUser};
