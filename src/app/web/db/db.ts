import * as sql from "mysql";
import { userType as user } from "../../../types/user.type.js";
const connection: sql.Pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "uba_ims",
  connectionLimit: 5,
});

export class DataBase {
  static saveUser(user: user): Promise<user> {
    return new Promise((resolve, reject) => {
      user.id = Date.now();
      connection.query(
        "Insert into users (id, firstname, lastname) values(?,?,?)",
        [user.id, user.firstname, user.lastname],
        (err, result, fields) => {
          if (err) {
            console.error("error Inserting user: ", err);
            return reject(err.message);
          }
          console.log();
          resolve(user);
        }
      );
    });
  }

  static updateUser(user: user): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET firstname = ?, lastname = ? WHERE id = ?",
        [user.firstname, user.lastname, user.id],
        (err, result, _fields) => {
          if (err) {
            console.error("Error updating user:", err);
            reject(err.message);
          }

          resolve(result.affectedRows);
        }
      );
    });
  }

  static readUser(limit: number, offset: number): Promise<user[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        "select firstname, lastname, id from users where deleteStatus=? LIMIT ? OFFSET ? ",
        [0, limit, offset],
        (err, result, _field) => {
          if (err) {
            reject([]);
          }

          resolve(result as user[]);
        }
      );
    });
  }

  static readUserbyId(id: number): Promise<user[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT firstname, lastname, id FROM users WHERE id = ? AND deleteStatus = ?",
        [id, 0],
        (err, result, _fields) => {
          if (err) {
            return reject(err.message);
          }

          resolve(result[0] as user[]);
        }
      );
    });
  }

  static deleteUser(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET deleteStatus= ? WHERE id = ? and deleteStatus =?",
        [1, id, 0],
        (err, result) => {
          if (err) {
            console.error("Error updating user:", err);
            reject(-1);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  }
}
