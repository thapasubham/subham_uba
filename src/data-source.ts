import "reflect-metadata";
import { DataSource } from "typeorm";
import { entities } from "./entity/table.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [...entities],

  migrations: ["./src/migrations/*.*"],
  subscribers: [],
});
