const jwt = require("jsonwebtoken");
const { user, userModel } = require("../models/users");

const config = require("config");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token not provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = await userModel.findById(user._id);
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  next();
}
module.exports = auth;
