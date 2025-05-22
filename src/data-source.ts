import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Mentor,

  user,
} from "./entity/user.js";
import {Intern, internShipDetails} from "./entity/intern";
import {Role} from "./entity/role";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [user, Intern, Mentor, internShipDetails, Role],
  migrations: ["./src/migrations/*.*"],
  subscribers: [],
});
