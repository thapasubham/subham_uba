#!/usr/bin/env node

const { CreateUser, DeleteUser, ReadUser, UpdateUser } = require('./users/user.js');

const args = process.argv;

if (args.length < 3) {
    console.log("Command not available");
    process.exit(1);
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
        if (args.length === 4) {
            DeleteUser(args[3]);
        } else {
            console.log("Invalid Command!\nUsage: del <firstname>");
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
            "\t- add <firstname> <lastname>\n" +
            "\t- del <firstname>\n" +
            "\t- read\n" +
            "\t- update <oldFirstname> <newFirstname> <newLastname>");
        break;
}
