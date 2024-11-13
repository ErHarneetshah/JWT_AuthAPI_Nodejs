import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import CommonFunctionClass from "../utils/comman.js";
import ValidationClass from "../utils/validations.js";
import UsersModelClass from "../model/UsersModel.js";
import accessTokenModel from "../model/accessTokenModel.js";
import starterTemplateClass from "../config/starterTemplate.js";

dotenv.config();

const router = express.Router();
const commonFunctions = new CommonFunctionClass();
const con = commonFunctions.connectionCredentials(); //* Connection Cred. initialization

//* Register Routes ------------------------------------------------------------------------------------
router.get("/register", (req, res) => {
  res.send("Get Register Request");
});

router.post("/register", async (req, res) => {
  let establishConnection;
  let hashedPass;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
      //* ValidationClass here
      const { error } = ValidationClass.registerValidationClass(req.body);
      if (error) return res.status(400).send(error.details);

      //* Email exists confirmation
      const emailExists = await UsersModelClass.checkEmail(
        establishConnection,
        req.body.email
      );
      if (emailExists.status) return res.status(400).send(emailExists.message);

      //* Encrypting Password
      const bcryptSalt = await bcrypt.genSalt(10);
      hashedPass = await bcrypt.hash(req.body.password, bcryptSalt);

      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        mobile_no: req.body.mobile_no
      };

      //* Registering New User
      const registerUser = await UsersModelClass.registerNewUser(
        establishConnection,
        userData
      );
      if (registerUser.status) {
        //* Authentication with JWT
        const expireDate = Math.floor(Date.now() / 1000) + (60 * 60);
        const actualExpDate = new Date(expireDate * 1000);
        const stringExpDate = actualExpDate.toLocaleString();

        const token = jwt.sign(
          { _id: registerUser.data, exp: expireDate },
          process.env.APP_TOKEN_SECRET
        );

        const tokenData = {
          accessToken: token,
          expireDate: expireDate,
          expireDateInString: stringExpDate,
        };
        console.log(tokenData);
        const registerTokenData = await accessTokenModel.addNewToken(
          establishConnection,
          tokenData
        );
        if (registerTokenData.status)
          return res.header("auth-token", token).json({
            status: registerTokenData.status,
            message: registerTokenData.message,
            data: registerTokenData.data,
          });

        return res
          .status(400)
          .send("Unable to authenticate it. Please try again later");
      }

      return res.status(400).send("Unable to Process the request");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
//* Register Routes ------------------------------------------------------------------------------------

//* Login Routes ---------------------------------------------------------------------------------------
router.get("/login", (req, res) => {
  res.send("Get Login Request");
});

router.post("/login", async (req, res) => {
  let establishConnection;
  try {
    establishConnection = await con.createConnection(); //* Connection Establishment
    if (establishConnection) {
      //* ValidationClass here
      const { error } = ValidationClass.loginValidationClass(req.body);
      if (error) return res.status(400).send(error.details);

      //* Email exists confirmation
      const emailExists = await UsersModelClass.checkEmail(
        establishConnection,
        req.body.email
      );
      if (!emailExists.status) return res.status(400).send(emailExists.message);

      const validatePass = await bcrypt.compare(
        req.body.password,
        emailExists.data.password
      );
      if (!validatePass) return res.status(400).send("Invalid Password");

      //* Authentication with JWT
      const expireDate =Math.floor(Date.now() / 1000) + (60 * 60);
      const actualExpDate = new Date(expireDate * 1000);
      const stringExpDate = actualExpDate.toLocaleString();

      const token = jwt.sign(
        { _id: emailExists.data.id, exp: expireDate },
        process.env.APP_TOKEN_SECRET
      );
      const tokenData = {
        accessToken: token,
        expireDate: expireDate,
        expireDateInString: stringExpDate,
      };
      const registerTokenData = await accessTokenModel.addNewToken(
        establishConnection,
        tokenData
      );
      if (registerTokenData.status)
        return res.header("auth-token", token).json({
          status: registerTokenData.status,
          message: registerTokenData.message,
          data: registerTokenData.data,
        });

      return res
        .status(400)
        .send("Unable to authenticate it. Please try again later");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
//* Login Routes ---------------------------------------------------------------------------------------

export default router;
