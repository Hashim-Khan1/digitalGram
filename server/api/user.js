const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const {
  hashPassword,
  createUser,
  isUserExists,
  verifyPassword,
  createUserInfo,
  getUserInfoData,
  isAvailable,
} = require("../model/users");
const { createJWT } = require("../model/Token");

router.use(bodyParser.json());

router.post("/create-user", async (req, res) => {
  const { data } = req.body;
  const parseData = JSON.parse(data);
  const { email, username, password, name } = parseData;
  const UUID = uuidv4();

  if (
    (await isAvailable("email", email)) == false &&
    (await isAvailable("username", username)) == false
  ) {
    res.status(201).send({
      message: "Both username and Email already in use",
      status: "unsuccessful",
    });
  } else if ((await isAvailable("email", email)) == false) {
    res.status(201).send({
      message: "Email already in use",
      status: "unsuccessful",
    });
  } else if ((await isAvailable("username", username)) == false) {
    res.status(201).send({
      message: "Username already in use",
      status: "unsuccessful",
    });
  } else {
    const hashedPassword = await hashPassword(password);
    createUser(email, username, hashedPassword, UUID);
    createUserInfo(UUID, name);

    res.status(201).send({
      message: "User successfully created",
      status: "successful",
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
    res.status(201).send({
      message: "Login successfully",
      status: "successful",
      isAuth: true,
      authToken: JWTtoken,
    });
  } else {
    res.status(201).send({
      message: "Incorrect Email or Password",
      status: "unsuccessful",
    });
  }
});
router.post("/user-data", async (req, res) => {
  const { username } = req.body;
  const response = await isUserExists(username);
  const { userID } = await isUserExists(username);
  const res2 = await getUserInfoData(userID);
  const res3 = { ...response, ...res2 };
  res.status(201).send({ profileData: res3 });
});
router.post("/update-user-details", async (req, res) => {
  const { data } = req.body;
});
module.exports = router;
