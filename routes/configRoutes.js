import express from "express";
import dotenv from "dotenv";

import CommonFunctionClass from "../utils/comman.js";
import starterTemplateClass from "../config/starterTemplate.js";

dotenv.config();

const router = express.Router();
const commomFunctions = new CommonFunctionClass();
const con = commomFunctions.connectionCredentials(); //* Connection Cred. initialization

router.post("/", async (req, res) => {
  let establishConnection;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
      const executeTemplate = await Promise.all(
        starterTemplateClass.template.map(({ name, schema }) =>
          con.createTable(establishConnection, name, schema)
        )
      );

      res.json({
        success: true,
        message: "All tables created successfully!",
        details: executeTemplate,
      });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
