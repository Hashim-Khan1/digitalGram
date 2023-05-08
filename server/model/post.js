const { Client } = require("cassandra-driver");
require("dotenv").config();
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

const uploadPost = (postID, username, tableID, typeOFPost) => {
  const date = new Date();
  const newDate = date.toString();
  const query =
    "INSERT INTO useractivities.posts (postid, createdby, date, tableid, typeofpost) VALUES (?, ?, ?, ?, ?)";

  client.execute(query, [postID, username, newDate, tableID, typeOFPost], {
    prepare: true,
  });
  // "INSERT INTO useractivities.posts (postid, createdby, date, tableid, typeofpost) VALUES (?, ?, ?, ?, ?)";
};
const uploadPostInfo = (postID, pictureURL, caption, likes) => {
  const query =
    "INSERT INTO useractivities.postpictureinfo (postid, pictureURL, caption, likes) VALUES (?, ?, ?, ?)";
  client.execute(query, [postID, pictureURL, caption, likes], {
    prepare: true,
  });
};
module.exports = { getData, uploadPost, uploadPostInfo };
