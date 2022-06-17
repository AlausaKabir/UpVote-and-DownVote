const express = require("express");
const validation = require("../utils/validation/userAuth");
const controller = require("../controllers/userAuth");

const Router = express.Router();

Router.post(
  "/Signup",
  validation.validateSignUp,
  validation.ValidatePassword,
  controller.Signup
);

Router.post("/SignIn", validation.ValidateSignIn, controller.SignIn);

module.exports = Router;
