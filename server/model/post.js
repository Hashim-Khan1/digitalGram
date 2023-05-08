const { Client } = require("cassandra-driver");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-digitalgram.zip",
  },
  credentials: {
    username: `${process.env.clientID}`,
    password: `${process.env.clientSecret}`,
  },
});
const getData = async () => {
  const [rows] = await client.execute("SELECT * FROM useractivities.posts");
  console.log(rows);
};

const uploadPost = () => {
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "../tmp/uploades");
  //   },
  // });
  // console.log("sss");
};
module.exports = { getData };
