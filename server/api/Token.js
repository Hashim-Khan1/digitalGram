const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("../model/Token");

router.use(bodyParser.json());

router.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  let tokenResult = verifyToken(token);
  res.send({
    isAuth: tokenResult,
  });
});

module.exports = router;
