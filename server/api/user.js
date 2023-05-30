const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");
const {
  hashPassword,
  createUser,
  isUserExists,
  verifyPassword,
  createUserInfo,
  getUserInfoData,
  isAvailable,
  updateUser,
  updateUserAvaliability,
  searchUsers,
} = require("../model/users");
const { createJWT } = require("../model/Token");

router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/uploads/profile");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.post("/create-user", async (req, res) => {
  const { data } = req.body;
  const parseData = JSON.parse(data);
  const { email, username, password, name } = parseData;

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
    const UUID = uuidv4();
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
  const { email, username, fromUser, bio, name } = req.body;
  const { userID } = await isUserExists(fromUser);

  const userResponse = await updateUserAvaliability(username, email, fromUser);
  let response = {
    ...userResponse,
  };
  console.log(userResponse);
  if (
    userResponse.success.successMsg == "Username changed only" ||
    userResponse.success.successMsg ==
      "Both username and email are valid, updating"
  ) {
    const JWTtoken = await createJWT(fromUser, "jwt");
    response.authToken = JWTtoken;
  }
  response.success.userInfo = "Bio and name changed";
  updateUser("usersInfo", "name", name, userID);
  updateUser("usersInfo", "bio", bio, userID);
  console.log(response, "Endpoint");
  res.status(201).send(response);
});
router.post("/update-profilepic", upload.single("files"), async (req, res) => {
  const { username } = req.body;
  const { userID } = await isUserExists(username);
  const imgURL = req.file.filename;
  updateUser("usersInfo", "profilepicurl", imgURL, userID);
  res.status(201).send({
    message: "Profile successfully updated",
  });
});
router.post("/search", async (req, res) => {
  const { users } = req.body;

  const totalUsers = await searchUsers(users);
  res.status(201).send({
    TotalAvaliableUsers: totalUsers,
  });
});
module.exports = router;
