import express from "express";
import { CommonFunction } from "../utils/comman.js";
import { databaseController } from "../model/databaseModel.js";

const router = express.Router();
const initiate = new CommonFunction();
const con = initiate.connectionCredentials();

router.post("/configureApp", async (req, res) => {
  let establishConnection;
  try {
    establishConnection = await con.createConnection();

    if (establishConnection) {
      const tableName = req.body.tableName;
      const attributes = req.body.attributes;

      const createTable = await con.createTable(establishConnection, tableName, attributes);
      
      if (createTable && createTable.status) {
        res.json({
          success: true,
          message: createTable.message,
        });
      } else {
        res.status(500).json({ success: false, message: createTable?.error || "Table creation failed" });
      }
    } else {
      res.status(500).json({ success: false, message: "Failed to establish a database connection." });
    }
  } catch (error) {
    console.error("Error establishing connection or creating table:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  } finally {
    if (establishConnection) {
      establishConnection.end((err) => {
        if (err) console.error("Error closing connection:", err);
      });
    }
  }
});


router.post("/register", (req, res) => {
  res.send("Register");
});

export default router;
