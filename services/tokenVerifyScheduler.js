import cron from "node-cron";
import express from "express";
import dotenv from "dotenv";

import CommonFunctionClass from "../utils/comman.js";
import accessTokenModel from "../model/accessTokenModel.js";

dotenv.config();

const router = express.Router();
const commonFunctions = new CommonFunctionClass();
const con = commonFunctions.connectionCredentials(); //* Connection Cred. initialization

// Schedule a task to run every minute
cron.schedule("* * * * *", async () => {
  let establishConnection;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
        
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
