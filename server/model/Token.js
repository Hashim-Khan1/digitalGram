const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = async (username) => {
  const res = jwt.sign({ data: username }, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });
  return res;
};
module.exports = { createJWT };
