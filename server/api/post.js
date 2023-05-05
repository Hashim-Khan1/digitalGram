const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { getData } = require("../model/post");

router.use(bodyParser.json());
router.post("/create-post", async (req, res) => {
  console.log("hit ");
  getData();
});
module.exports = router;
