import { createConnection } from "typeorm";
import { createInitialData } from "./libs/initialStartup";

/* ----- DataBase Connection ----- */

// createConnection method will automatically read connection options from the ormconfig file or environment variables
createConnection()
  .then((response) => {
    createInitialData();
    console.info("DB is connected...")
  })
  .catch((error) => console.log(error));