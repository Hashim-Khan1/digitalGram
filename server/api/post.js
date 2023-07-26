const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const {
  getPostDataByUser,
  uploadPost,
  uploadPostInfo,
  getData2,
  getPostDataByID,
} = require("../model/post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
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

  const imgURLs = imgNames().map((url) => url.replace(/\.[^/.]+$/, ""));
  const imgURL = imgURLs.toString();
  const postID = uuidv4();

  uploadPost(postID, username, "postpictureinfo", "Img post");
  uploadPostInfo(postID, imgURL, caption, "0");
  res.status(201).send({
    message: "Post successfully uploaded",
    status: "successful",
  });
});
router.get("/images/:user", async (req, res) => {
  const { user } = req.params;

  let res2 = await getPostDataByUser(user);
  const postDataOptions = await Promise.all(
    res2.map(async (index) => {
      const { postid } = index;
      let postInfo = await getData2(postid);
      let mapLobby = { ...index, postInfo };
      return mapLobby;
    })
  );
  res.send(postDataOptions);
});

router.get("/info/:postID", async (req, res) => {
  const { postID } = req.params;
  let info = {};
  const res1 = await getPostDataByID(postID);
  let postInfo = await getData2(postID);
  info = { ...res1[0], ...postInfo[0] };
  res.send(info);
  console.log(info);
});

router.get("/image/:type/:ID", (req, res) => {
  const { ID, type } = req.params;

  const getType = (type) => {
    let pathUrl = path.join(__dirname, "../uploads/profile/" + ID + ".jpg");

    if (type == "post") {
      pathUrl = path.join(__dirname, "../uploads/posts/" + ID + ".jpg");

      return pathUrl;
    }
    return pathUrl;
  };

  if (ID !== undefined && fs.existsSync(getType(type))) {
    res.sendFile(getType(type));
  } else {
    res.send("File no exists");
  }
});
module.exports = router;
