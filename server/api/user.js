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
  isFriend,
  addUser,
  getAllFriendRequests,
  updateFriend,
  removeRequest,
  getAcceptedRequests,
} = require("../model/users");
const { createJWT } = require("../model/Token");

router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile");
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
  const { username, myUser } = req.body;
  const { userID } = await isUserExists(username);
  if (userID != undefined) {
    const res2 = await getUserInfoData(userID);
    const checkFriend = await isFriend(myUser, username);

    const res3 = { ...res2, username, friendStatus: checkFriend };
    res.status(201).send({ profileData: res3 });
  } else {
    res.status(201).send({ profileData: false });
  }
});
router.post("/update-user-details", async (req, res) => {
  const { email, username, fromUser, bio, name } = req.body;
  const { userID } = await isUserExists(fromUser);

  const userResponse = await updateUserAvaliability(username, email, fromUser);
  let response = {
    ...userResponse,
  };
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
  const imgName = imgURL.replace(/\.[^/.]+$/, "");
  updateUser("usersInfo", "profilepicurl", imgName, userID);
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
router.post("/add-user", async (req, res) => {
  const { fromUser, targetUser } = req.body;
  const responseFromAddedUser = await isFriend(fromUser, targetUser);
  console.log(responseFromAddedUser);
  if (responseFromAddedUser == false) {
    console.log("Request sent");
    addUser(fromUser, targetUser, "Pending");
    res.status(201).send({
      message: "Login successfully",
      status: "successful",
    });
  } else {
    console.log("Request alreay exists");
  }
});
router.get("/totalrequests/:clientUsername", async (req, res) => {
  const { clientUsername } = req.params;
  const requestData = await getAllFriendRequests(clientUsername);
  const userData = await Promise.all(
    requestData.map(async (index) => {
      const { fromUser, friend_ID } = index;
      const { userID } = await isUserExists(fromUser);
      const userDataReturn = await getUserInfoData(userID);
      let mapData = { ...userDataReturn, fromUser, friend_ID };
      return mapData;
    })
  );
  res.send(userData);
});
router.post("/accept-request", async (req, res) => {
  const { friendID } = req.body;
  updateFriend("status", "Accepted", friendID);
  res.send("Data successfuylly updated");
});
router.post("/delete-request", async (req, res) => {
  const { friendID } = req.body;
  removeRequest(friendID);
  res.send("User successfuylly Removed");
});
router.get("/acceptedRequests/:clientUsername", async (req, res) => {
  const { clientUsername } = req.params;
  console.log(clientUsername);
  const requestData = await getAcceptedRequests(clientUsername);
  const userData = await Promise.all(
    requestData.map(async (index) => {
      const { fromUser, friend_ID } = index;
      const { userID } = await isUserExists(fromUser);
      const userDataReturn = await getUserInfoData(userID);
      let mapData = { ...userDataReturn, fromUser, friend_ID };
      return mapData;
    })
  );
  res.send(userData);
});

module.exports = router;
