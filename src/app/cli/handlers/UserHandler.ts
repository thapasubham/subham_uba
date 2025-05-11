import { user } from "../../../types/user.type.js";
import { FileUtility } from "../../utils/files.js";
import { Logger } from "../../utils/Logger.js";
import chalk from "chalk";

export class Users {
  async CreateUser(user: user): Promise<boolean> {
    const data: user[] = FileUtility.readFile();

    user.id = data.length + 1;
    if (FileUtility.userExists(user)) {
      Logger.Warn("User Already Exists");
      return false;
    }
    data.push(user);
    const result = FileUtility.SaveUser(data);
    if (result == false) {
      Logger.Warn("Failed to save user.");
      return false;
    } else {
      Logger.Success(`User ${user.firstname} ${user.lastname} added!`);
      return true;
    }
  }

  async DeleteUser(query: number): Promise<boolean> {
    const userData = FileUtility.readFile();

    const users = userData.filter((u: user) => u.id !== query);

    if (userData.length == users.length) {
      Logger.Error(`The user doesnt exist`);
      return false;
    }

    const result = FileUtility.SaveUser(users);
    if (result == false) {
      Logger.Warn("Failed to Delete User");
      return false;
    } else {
      Logger.Success("User Deleted!!");
      return true;
    }
  }

  async ReadUsers(): Promise<user[]> {
    const userdata: user[] = FileUtility.readFile();

    if (userdata.length == 0) {
      Logger.Warn("No Users Exists");
      return [];
    }
    userdata.forEach((userdata) => {
      Logger.Info(
        `${userdata.id} \t${userdata.firstname} \t${userdata.lastname}`
      );
    });
    return userdata;
  }

  async Update(user: user): Promise<boolean> {
    const userData: user[] = FileUtility.readFile();

    const index = userData.findIndex((u) => u.id === user.id);
    if (index === -1) {
      Logger.Warn("The user doesn't Exist");
      return false;
    }

    if (FileUtility.userExists(user)) {
      Logger.Warn("Cannot update user date. \nUser data already Exists");

      return false;
    }
    userData[index] = user;

    const result = FileUtility.SaveUser(userData);

    if (result == false) {
      Logger.Error("Failed to update user");
      return false;
    } else {
      Logger.Success("User data updated");
      return true;
    }
  }
}
