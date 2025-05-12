import * as fs from "fs";
import { user } from "../types/user.type.js";
import { Logger } from "./Logger.js";
const path = "user.json";

export class FileUtility {
  static readFile() {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "[]");
      return [];
    }
    try {
      const fileDate = fs.readFileSync(path, "utf-8");
      const userData: user[] = JSON.parse(fileDate);
      return userData;
    } catch (error) {
      Logger.Warn(`No user Exists: , ${error}`);
      return [];
    }
  }

  static SaveUser(data: user[]) {
    try {
      fs.writeFileSync(path, JSON.stringify(data, null, 1));
      return true;
    } catch (error) {
      Logger.Warn(`No user Exists: , ${error}`);
      return false;
    }
  }

  static userExists(user: user) {
    const datas: user[] = FileUtility.readFile();
    for (let i = 0; i < datas.length; i++) {
      if (
        datas[i].firstname === user.firstname &&
        datas[i].lastname === user.lastname
      ) {
        return true;
      }
    }
    return false;
  }

  static getIndex(id: number) {
    const data: user[] = FileUtility.readFile();

    const index = data.findIndex((u) => u.id === id);
    return index;
  }
}
