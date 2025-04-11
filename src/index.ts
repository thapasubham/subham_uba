#!/usr/bin/env node


import { Users } from './handlers/UserHandler.js';
const args = process.argv;

if (args.length < 3) {
    console.log("Available commands:\n" +
        "\t- uba add <firstname> <lastname>\n" +
        "\t- uba del <firstname> or\n\t--all(deleted all users)\n" +
        "\t- uba read\n" +
        "\t- uba update <oldFirstname> <newFirstname> <newLastname>");
    process.exit();
}

const command = args[2];
const user = new Users();
switch (command) {
    case "add":
        if (args.length === 5) {
            user.CreateUser({firstname:args[3], lastname: args[4]});
        } else {
            console.log("Invalid Command!\nUsage: add <firstname> <lastname>");
        }
        break;

    case "del":
        if (args.length === 4&& args[3]=="--all") {
            user.DeleteUser({firstname:"all"});
        }else if(args.length === 4){
            user.DeleteUser({firstname: args[3]});
        } else {
            console.log("Invalid Command!\nUsage: del <firstname> or \n del --all");
        }
        break;

    case "read":
        if (args.length === 3) {
            user.ReadUser();
        } else {
            console.log("Invalid Command!\nUsage: read");
        }
        break;

    case "update":
        if (args.length === 6) {
            user.Update({firstname:args[3]}, {firstname:args[5], lastname:args[6]});
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
