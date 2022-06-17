const validatorJs = require("validatorjs");
const model = require("../../../model");
const { decodeToken } = require("../helpers/jwt");
const { errorResponse } = require("../helpers/response");

module.exports = {
  async validateSignUp(req, res, next) {
    const validator = new validatorJs(req.body, {
      password: "required|min:6",
      email: "required|email",
      firstName: "required|string",
      lastName: "required|string",
    });

    if (validator.fails()) {
      return errorResponse(res, 400, validator.errors.all());
    }

    try {
      const user = await model.User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return next();
      }
      return errorResponse(res, 400, "User already registered with email");
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  ValidatePassword(req, res, next) {
    const { password } = req.body;
    console.log(password);
    const regex = /[^a-z/A-Z]+/;
    if (regex.exec(password) !== null) {
      return next();
    }
    const error = "Password must have a special character";
    return errorResponse(res, 400, error);
  },

  ValidateSignIn(req, res, next) {
    const validator = new validatorJs(req.body, {
      password: "required",
      email: "required|email",
    });

    if (validator.fails()) {
      return errorResponse(res, 400, validator.error.all());
    }
    return next();
  },

  async validateUserToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return errorResponse(res, 401, "token required");
    }
    const user = await decodeToken(authorization);
    if (!user) {
      return errorResponse(res, 401, "Invalid User Token");
    }
    req.user = user;
    console.log(user);
    return next();
  },
};
