import { startServer } from "./app/web/app.js";
import { AppDataSource } from "./data-source.js";



AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    startServer();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
