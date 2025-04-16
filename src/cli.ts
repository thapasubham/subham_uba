import { Users } from './handlers/UserHandler.js';
import { user } from './types/user.type.js';
const args = process.argv;


const command = args[2];
const user = new Users();

export function createCli(){
if(args.length>2){
    cliCommands();
}
}

function cliCommands(){
switch (command) {
    case "add":
        if (args.length === 5) {
            user.CreateUser({firstname:args[3], lastname: args[4]});
        } else {
            console.log("Invalid Command!\nUsage: add <firstname> <lastname>");
        }
        break;

    case "del":
        if (args.length === 4 && args[3]==="all") {
            user.DeleteUser("all");
        }else if(args.length >= 4){
           
            user.DeleteUser(parseInt(args[3]));
        } else {
            console.log("Invalid Command!\nUsage: del <firstname> or \n del all");
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
            user.Update({firstname:args[3], lastname:args[4], id: parseInt(args[5])});
        } else {
            console.log("Invalid Command!\nUsage: update <firstname> <lastname> <id>");
        }
        break;

    default:
       help();
        break;
}

}

function help(){
    console.log("Such command doesn't exist");
    console.log("Available commands:\n" +
        "\t- uba add <firstname> <lastname>\n" +
        "\t- uba del <firstname>\n or all(deleted all users)" +
        "\t- uba read\n" +
        "\t- uba update <firstname> <lastname> <id>");
}