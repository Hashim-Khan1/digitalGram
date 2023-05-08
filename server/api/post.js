const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const { getData } = require("../model/post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.use(bodyParser.json());
router.post("/create-post", upload.array("files"), async (req, res) => {
  console.log();
  const imgNames = () => {
    return req.files.map((file) => file.filename);
  };
  console.log(imgNames().toString(), "Img names");
  const { caption } = req.body;
  console.log("hit ");
  console.log(caption);
  // getData();
});
module.exports = router;
