import chalk from "chalk";
import { Users } from "./handlers/UserHandler.js";
import { Logger } from "../utils/Logger.js";
const args = process.argv;

const command = args[2];
const user = new Users();

export function createCli() {
  if (args.length > 2) {
    cliCommands();
  }
}

async function cliCommands() {
  switch (command) {
    case "add":
      if (args.length === 5) {
        await user.CreateUser({ firstname: args[3], lastname: args[4], id: 0 });
      } else {
        console.log(
          Logger.Warn("Invalid Command!\nUsage: add <firstname> <lastname>")
        );
      }
      break;

    case "del":
      if (args.length >= 4) {
        user.DeleteUser(parseInt(args[3]));
      } else {
        console.log(
          Logger.Warn("Invalid Command!\nUsage: del <firstname> or \n del all")
        );
      }
      break;

    case "read":
      if (args.length === 3) {
        await user.ReadUsers();
      } else {
        Logger.Warn("Invalid Command!\nUsage: read");
      }
      break;

    case "update":
      if (args.length === 6) {
        user.Update({
          firstname: args[3],
          lastname: args[4],
          id: parseInt(args[5]),
        });
      } else {
        Logger.Warn(
          "Invalid Command!\nUsage: update <firstname> <lastname> <id>"
        );
      }
      break;

    default:
      help();
      break;
  }
}

function help() {
  Logger.Warn("Such command doesn't exist");
  console.log(
    "Available commands:\n" +
      "\t- uba add <firstname> <lastname>\n" +
      "\t- uba del <firstname>\n or all(deleted all users)" +
      "\t- uba read\n" +
      "\t- uba update <firstname> <lastname> <id>"
  );
}
