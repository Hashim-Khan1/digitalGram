const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { getData, uploadPost, uploadPostInfo } = require("../model/post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/uploads/posts");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.use(bodyParser.json());
router.post("/create-post", upload.array("files"), async (req, res) => {
  const { caption, username } = req.body;
  const imgNames = () => {
    return req.files.map((file) => file.filename);
  };
  const imgURL = imgNames().toString();
  const postID = uuidv4();

  uploadPost(postID, username, "postpictureinfo", "Img post");
  uploadPostInfo(postID, imgURL, caption, "0");
  res.status(201).send({
    message: "Post successfully uploaded",
    status: "successful",
  });
});
module.exports = router;
