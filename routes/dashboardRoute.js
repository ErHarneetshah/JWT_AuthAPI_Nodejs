import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import CommonFunction from "../utils/comman.js";

dotenv.config();

const router = express.Router();

router.get("/", CommonFunction.verifyAuth, (req, res) => {
  res.send(req.user);
});

export default router;
