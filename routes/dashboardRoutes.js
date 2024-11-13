import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import CommonFunctionClass from "../utils/comman.js";

dotenv.config();

const router = express.Router();
const commonFunctions = new CommonFunctionClass();

router.get("/", commonFunctions.verifyAuth, (req, res) => {
  res.send(req.user);
});

export default router;
