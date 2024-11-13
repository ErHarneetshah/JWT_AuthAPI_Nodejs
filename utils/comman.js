import DatabaseModelClass from "../model/DatabaseModel.js";
import accessTokenModel from "../model/accessTokenModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

class CommonFunctionClass {
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
    if (!databaseName && !process.env.APP_DBNAME) {
      throw new Error("Database Name is missing.");
    }

    const dbInstance = new DatabaseModelClass(
      host || process.env.APP_DBHOST,
      username || process.env.APP_DBUSERNAME,
      password || process.env.APP_DBPASSWORD,
      databaseName || process.env.APP_DBNAME
    );

    return dbInstance;
  }

  async verifyAuth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(400).send("Access Denied");

    try {
      const dbInstance = new DatabaseModelClass(
        process.env.APP_DBHOST,
        process.env.APP_DBUSERNAME,
        process.env.APP_DBPASSWORD,
        process.env.APP_DBNAME
      );
      const establishConnection = await dbInstance.createConnection();
      const tokenExists = await accessTokenModel.checkToken(establishConnection, token);
      
      if(!tokenExists.status) return res.status(400).send(tokenExists.message); 
      const verified = jwt.verify(token, process.env.APP_TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid Token");
    }
  }
}

export default CommonFunctionClass;
