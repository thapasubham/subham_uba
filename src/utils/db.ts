import * as sql from "mysql";
import { user } from "../types/user.type";
const connection: sql.Pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "uba_ims",
  connectionLimit: 5,
});

export function saveUser(user: user): Promise<user> {
  return new Promise((resolve, reject) => {
    user.id = Date.now();
    connection.query(
      "Insert into users (id, firstname, lastname) values(?,?,?)",
      [user.id, user.firstname, user.lastname],
      (err, _result, _fields) => {
        if (err) {
          console.error("error Inserting user: ", err);
          reject(err.message);
        }

        resolve(user);
      }
    );
  });
}

export function updateUser(user: user) {
  connection.query(
    "UPDATE users SET firstname = ?, lastname = ? WHERE id = ?",
    [user.firstname, user.lastname, user.id],
    (err, _result, _fields) => {
      if (err) {
        console.error("Error updating user:", err);
        return err.message;
      }

      return user;
    }
  );
}

export function readUser(page: number, offset: number): Promise<user[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      "select firstname, lastname, id from users where deleteStatus=? LIMIT ? OFFSET ? ",
      [0, page, offset],
      (err, result, _field) => {
        if (err) {
          reject([]);
        }

        resolve(result as user[]);
      }
    );
  });
}

export function readUserbyId(id: number): Promise<user[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      "Select firstname, lastname, id from users where id =? and deleteStatus=?",
      [id, 0],
      (err, result, _fields) => {
        if (err) {
          console.log(err);
          reject([]);
        }

        resolve(result as user[]);
      }
    );
  });
}

export function GetIndex(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id FROM users WHERE id = ? AND deleteStatus = ?",
      [id, 1],
      (err, results) => {
        if (err) {
          console.error("Error:", err);
          reject(0);
        } else {
          if (results.length > 0) {
            resolve(-1);
          } else {
            resolve(id);
          }
        }
      }
    );
  });
}

export function deleteUser(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET deleteStatus= ? WHERE id = ?",
      [1, id],
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
