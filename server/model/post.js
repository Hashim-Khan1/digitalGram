const { Client } = require("cassandra-driver");
require("dotenv").config();
const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-digitalgram.zip",
  },
  credentials: {
    username: `${process.env.clientID}`,
    password: `${process.env.clientSecret}`,
  },
});
const getPostDataByUser = async (user) => {
  try {
    const showItems = await client.execute(
      "SELECT * FROM useractivities.posts WHERE createdby = ? ALLOW FILTERING;",
      [user],
      { prepare: true }
    );
    return showItems.rows;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const getPostDataByID = async (ID) => {
  try {
    const showItems = await client.execute(
      "SELECT * FROM useractivities.posts WHERE postid = ? ALLOW FILTERING;",
      [ID],
      { prepare: true }
    );
    return showItems.rows;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const getData2 = async (user) => {
  try {
    const showItems = await client.execute(
      "SELECT * FROM useractivities.postpictureinfo WHERE postid = ? ALLOW FILTERING;",
      [user],
      { prepare: true }
    );
    return showItems.rows;
  } catch (err) {
    console.log(err);
    return {};
  }
};
const uploadPost = (postID, username, tableID, typeOFPost) => {
  const date = new Date();
  const newDate = date.toString();
  const query =
    "INSERT INTO useractivities.posts (postid, createdby, date, tableid, typeofpost) VALUES (?, ?, ?, ?, ?)";

  client.execute(query, [postID, username, newDate, tableID, typeOFPost], {
    prepare: true,
  });
};
const uploadPostInfo = (postID, pictureURL, caption, likes) => {
  const query =
    "INSERT INTO useractivities.postpictureinfo (postid, pictureURL, caption, likes) VALUES (?, ?, ?, ?)";
  client.execute(query, [postID, pictureURL, caption, likes], {
    prepare: true,
  });
};
module.exports = {
  getPostDataByUser,
  uploadPost,
  uploadPostInfo,
  getData2,
  getPostDataByID,
};
