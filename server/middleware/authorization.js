const jwt = require("jsonwebtoken");
require("dotenv").config();

const {JWT_SECRET} = require('../credentials')

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json(false);
    }

    const payload = jwt.verify(jwtToken, JWT_SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json(false);
  }
};
