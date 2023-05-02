const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const {
  hashPassword,
  createUser,
  isUserExists,
  verifyPassword,
} = require("../model/users");
const { createJWT } = require("../model/Token");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create-user", async (req, res) => {
  const { data } = req.body;
  const parseData = JSON.parse(data);
  const { email, username, password } = parseData;

  const hashedPassword = await hashPassword(password);

  if ((await isUserExists(username)) == false) {
    console.log("user doesnt exist, create the user");
    createUser(email, username, hashedPassword);
    res.status(201).send({
      message: "User successfully created",
      status: "successful",
    });
  } else {
    console.log("user exists use different username or email");
    res.status(201).send({
      message: "Email or username already in use",
      status: "unsuccessful",
    });
  }
});
router.post("/login", async (req, res) => {
  const { data } = req.body;
  const parseData = JSON.parse(data);
  const { email, clientPassword } = parseData;
  const { username, password } = await isUserExists(email);

  const checkPassword = async (password) => {
    if (password === undefined) {
      return "false";
    } else {
      return password;
    }
  };
  if (
    (await isUserExists(email)) != false &&
    (await verifyPassword(clientPassword, await checkPassword(password))) ==
      true
  ) {
    const JWTtoken = await createJWT(username, "jwt");
    res.cookie("access-token", "sss");
    res.status(201).send({
      message: "Login successfully",
      status: "successful",
    });
  } else {
    res.status(201).send({
      message: "Incorrect Email or Password",
      status: "unsuccessful",
    });
  }
});
module.exports = router;
