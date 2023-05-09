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
} = require("../model/users");
const { createJWT } = require("../model/Token");

router.use(bodyParser.json());

router.post("/create-user", async (req, res) => {
  const { data } = req.body;
  const parseData = JSON.parse(data);
  const { email, username, password, name } = parseData;
  const UUID = uuidv4();

  const hashedPassword = await hashPassword(password);

  if ((await isUserExists(username)) == false) {
    console.log("user doesnt exist, create the user");
    createUser(email, username, hashedPassword, UUID);
    createUserInfo(UUID, name);

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
  const parseData = JSON.parse(data);
});
module.exports = router;
