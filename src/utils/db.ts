import * as sql from "mysql";
import { user } from "../types/user.type";
const connection: sql.Pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "uba_ims",
  connectionLimit: 5,
});

export function saveUser(user: user) {
  console.log(user.firstname, user.lastname);
  connection.query(
    "Insert into users (id, firstname, lastname) values(?,?,?)",
    [user.id, user.firstname, user.lastname],
    (err, result, fields) => {
      console.log(result);
    }
  );
}
