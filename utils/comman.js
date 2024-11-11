import { databaseController } from "../controllers/databaseController.js";
import dotenv from "dotenv";

dotenv.config();

class CommonFunction {
  constructor() {}

  connectionCredentials(
    host = null,
    username = null,
    password = null,
    databaseName = null
  ) {
    // Check if required environment variables are missing
    if (!host && !process.env.APP_DBHOST) {
      throw new Error("Database host is missing.");
    }
    if (!username && !process.env.APP_DBUSERNAME) {
      throw new Error("Database username is missing.");
    }
    if (!password && !process.env.APP_DBPASSWORD) {
      throw new Error("Database password is missing.");
    }

    const dbInstance = new databaseController(
      host || process.env.APP_DBHOST,
      username || process.env.APP_DBUSERNAME,
      password || process.env.APP_DBPASSWORD,
      databaseName || process.env.APP_DBNAME
    );

    return dbInstance;
  }
}

export { CommonFunction };
