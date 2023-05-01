const express = require("express");
const router = express.Router();
const { hashPassword, createUser, isUserExists } = require("../model/users");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

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
module.exports = router;
