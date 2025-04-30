import * as sql from "mysql";
import { user } from "../types/user.type";
import { UserService } from "../web/services/UserService";
const connection: sql.Pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "uba_ims",
  connectionLimit: 5,
});

export function saveUser(user: user) {
  user.id = Date.now();
  connection.query(
    "Insert into users (id, firstname, lastname) values(?,?,?)",
    [user.id, user.firstname, user.lastname],
    (err, result, fields) => {
      if (err) {
        console.error("error Inserting user: ", err);
        return err.message;
      }

      return user;
    }
  );
}

export function updateUser(user: user) {
  connection.query(
    "UPDATE users SET firstname = ?, lastname = ? WHERE id = ?",
    [user.firstname, user.lastname, user.id],
    (err, result, fields) => {
      if (err) {
        console.error("Error updating user:", err);
        return err.message;
      }

      console.log("Update result:", result);
      return user;
    }
  );
}

export function readUser(page: number, offset: number): Promise<user[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      "select firstname, lastname, id from users where deleteStatus=? LIMIT ? OFFSET ? ",
      [0, page, offset],
      (err, result, field) => {
        if (err) {
        }

        console.log(result);
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
      (err, result, fields) => {
        if (err) {
          console.log(err);
          reject(err.message);
        }

        resolve(result as user[]);
      }
    );
  });
}

export function GetIndex(id: number) {
  return -1;
}

export function deleteUser(id: number) {
  connection.query(
    "UPDATE users SET deleteStatus= ? WHERE id = ?",
    [1, id],
    (err, result, fields) => {
      if (err) {
        console.error("Error updating user:", err);
      }

      return id;
    }
  );
}
