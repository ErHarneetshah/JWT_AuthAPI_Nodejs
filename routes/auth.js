import express from "express";
import CommonFunction from "../utils/comman.js";
import Validation from "../utils/validations.js";
import UsersModel from "../model/UsersModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
const con = CommonFunction.connectionCredentials();//* Connection Cred. initialization


router.get("/register", (req, res) => {
  res.send("Get Register Request");
});

router.post("/register", async (req, res) => {
  let establishConnection;
  let hashedPass;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
      //* Validation here
      const {error} = Validation.registerValidation(req.body);
      if(error) return res.status(400).send(error.details); 

      //* Email exists confirmation
      const emailExists = await UsersModel.checkEmail(establishConnection, req.body.email);
      if(emailExists.status) return res.status(400).send(emailExists.message);

      //* Encrypting Password
      const bcryptSalt = await bcrypt.genSalt(10);
      hashedPass = await bcrypt.hash(req.body.password, bcryptSalt);

      const userData = {name: req.body.name, email: req.body.email, password: hashedPass};
      
      //* Registering New User
      const registerUser = await UsersModel.registerNewUser(establishConnection, userData);
      if(registerUser.status)
      {
        return res.status(200).send('New User Registered Successfully');
      }
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/login", (req, res) => {
  res.send("Get Login Request");
});

router.post("/login", async (req, res) => {
  let establishConnection;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
      //* Validation here
      const {error} = Validation.loginValidation(req.body);
      if(error) return res.status(400).send(error.details); 

      //* Email exists confirmation
      const emailExists = await UsersModel.checkEmail(establishConnection, req.body.email);
      if(!emailExists.status) return res.status(400).send(emailExists.message);

      const validatePass = await bcrypt.compare(req.body.password, emailExists.data.password);
      if(!validatePass) return res.status(400).send("Invalid Password");

      const token = jwt.sign({_id:emailExists.data.id}, process.env.APP_TOKEN_SECRET);
      res.header('auth-token', token).send(token);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
