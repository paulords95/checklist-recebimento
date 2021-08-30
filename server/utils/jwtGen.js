const jwt = require("jsonwebtoken");
require("dotenv").config();

const {JWT_SECRET} = require('../credentials')

const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "480hr" });
};

module.exports = jwtGenerator;
