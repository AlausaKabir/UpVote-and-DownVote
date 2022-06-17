const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../../../config/keys");
const model = require("../../../model");

async function generateToken(user) {
  const payload = {
    subject: user.id,
  };

  const options = {
    expiresIn: "7d",
  };
  //   console.log(JWTSecret, "hhhhhhh");
  try {
    const token = await jwt.sign(payload, JWTSecret, options);
    return token;
  } catch (error) {
    return error.message;
  }
}

async function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, JWTSecret);
    const user = await model.User.findById(decoded.subject).exec();
    if (!user) throw Errpr("no such user");
    return user;
  } catch (error) {
    return null;
  }
}
module.exports = {
  generateToken,
  decodeToken,
};
