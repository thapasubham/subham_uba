import { startServer } from "./app/web/app.js";
import { AppDataSource } from "./data-source.js";
import { Seed } from "./seed/seed.js";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    await Seed.RoleSeed();
    startServer();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
