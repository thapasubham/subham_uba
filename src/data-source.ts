import "reflect-metadata";
import { DataSource } from "typeorm";
import { InternshipDetail, user } from "./entity/user.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "intern_db",
  synchronize: true,
  logging: false,
  entities: [user, InternshipDetail],
  migrations: ["migration/*.ts"],
  subscribers: [],
});
