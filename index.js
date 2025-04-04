#!/usr/bin/env node

const { CreateUser, DeleteUser, ReadUser, UpdateUser } = require('./users/user.js');

const args = process.argv;

if (args.length < 3) {
    console.log("Expected at least one argument!");
    return;
}

const command = args[2];

switch (command) {
    case "add":
        if (args.length === 5) {
            CreateUser(args[3], args[4]);
        } else {
            console.log("Invalid Command!\nUsage: add <firstname> <lastname>");
        }
        break;

    case "del":
        if (args.length === 4&& args[3]=="--all") {
            DeleteUser("all");
        }else if(args.length === 4){
            DeleteUser(args[3]);
        } else {
            console.log("Invalid Command!\nUsage: del <firstname> or \n del --all");
        }
        break;

    case "read":
        if (args.length === 3) {
            ReadUser();
        } else {
            console.log("Invalid Command!\nUsage: read");
        }
        break;

    case "update":
        if (args.length === 6) {
            UpdateUser(args[3], args[4], args[5]);
        } else {
            console.log("Invalid Command!\nUsage: update <oldFirstName> <newFirstName> <newLastName>");
        }
        break;

    default:
        console.log("Such command doesn't exist");
        console.log("Available commands:\n" +
            "\t- uba add <firstname> <lastname>\n" +
            "\t- uba del <firstname>\n or --all(deleted all users)" +
            "\t- uba read\n" +
            "\t- uba update <oldFirstname> <newFirstname> <newLastname>");
        break;
}
