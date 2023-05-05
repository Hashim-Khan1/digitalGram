const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = async (username) => {
  const res = jwt.sign({ data: username }, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });
  return res;
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(res);
    res;
    console.log(res);
  } catch (err) {
    return false;
  }
};
module.exports = { createJWT, verifyToken };
