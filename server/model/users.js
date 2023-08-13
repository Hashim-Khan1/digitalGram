const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { Client } = require("cassandra-driver");

const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-digitalgram.zip",
  },
  credentials: {
    username: `${process.env.clientID}`,
    password: `${process.env.clientSecret}`,
  },
});
const conn = mysql.createConnection(process.env.DATABASE_URL);
const isUserExists = async (username) => {
  try {
    const res = conn
      .promise()
      .query("SELECT * FROM users WHERE username = ? OR email = ? ", [
        username,
        username,
      ])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return false;
        }
      });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const hashPassword = async (password) => {
  const salt = 12;
  return bcrypt.hashSync(password, salt);
};

const createUser = async (email, username, password, UUID) => {
  conn.execute(
    "INSERT INTO users (email,username,password,userID) VALUES (?,?,?,?)",
    [email, username, password, UUID]
  );
};
const createUserInfo = (UserID, name) => {
  conn.execute("INSERT INTO usersInfo (userID,name) VALUES (?,?)", [
    UserID,
    name,
  ]);
};
const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
const getUserInfoData = async (UUID) => {
  console.log(UUID);
  const res = conn
    .promise()
    .execute("SELECT * FROM usersInfo WHERE userID = ? ", [UUID])
    .then(([rows, fields]) => {
      return rows[0];
    });
  return res;
};
const isAvailable = async (column, value) => {
  const res = conn
    .promise()
    .query("SELECT * FROM users WHERE ??=?", [column, value])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return false;
      } else {
        return true;
      }
    });
  return res;
};
const detectChange = async (
  userInputUsername,
  userInputEmail,
  fromClientUser
) => {
  let res;
  const { username, email } = await isUserExists(fromClientUser);
  switch (true) {
    case userInputUsername !== username && userInputEmail !== email:
      res = "Change Both";
      break;
    case userInputUsername !== username:
      res = "Username Change";
      break;
    case userInputEmail !== email:
      res = "Email Change";
      break;
    default:
      res = "No Change";
      break;
  }
  return res;
};
const updateUser = (table, column, value, conditionValue) => {
  conn.query("UPDATE ?? SET ?? = ? WHERE userID = ?", [
    table,
    column,
    value,
    conditionValue,
  ]);
};

const updateUserAvaliability = async (
  clientUsername,
  clientEmail,
  fromClientUser
) => {
  const changeWhat = await detectChange(
    clientUsername,
    clientEmail,
    fromClientUser
  );
  const { userID } = await isUserExists(fromClientUser);

  let changeEmail;
  let changeUsername;
  let response = {
    change: changeWhat,
    error: {},
    success: {},
  };

  switch (changeWhat) {
    case "Change Both":
      changeEmail = await isAvailable("email", clientEmail);
      changeUsername = await isAvailable("username", clientUsername);
      if (changeEmail && changeUsername) {
        response.success.successMsg =
          "Both username and email are valid, updating";
        updateUser("users", "email", clientEmail, userID);
        updateUser("users", "username", clientUsername, userID);
      } else if (!changeEmail && !changeUsername) {
        response.error.errMsg = "Both Username and Email are already in use";
      } else if (!changeUsername) {
        updateUser("users", "email", clientEmail, userID);
        response.success.successMsg = "Email changed only";
        response.error.errMsg = "Username already taken";
      } else {
        response.success.successMsg = "Username changed only";
        response.error.errMsg = "Email already taken";
        updateUser("users", "username", clientUsername, userID);
      }
      break;
    case "Username Change":
      changeUsername = await isAvailable("username", clientUsername);

      if (changeUsername) {
        updateUser("users", "username", clientUsername, userID);
        response.success.successMsg = "Username changed only";
      } else {
        response.error.errMsg = "Username already taken";
      }
      break;
    case "Email Change":
      changeEmail = await isAvailable("email", clientEmail);

      if (changeEmail) {
        updateUser("users", "email", clientEmail, userID);
        response.success.successMsg = "Email changed only";
      } else {
        response.error.errMsg = "Email already in use";
      }
      break;
    default:
      response.userMessage = "No changes needed";
      break;
  }
  return response;
};
const searchUsers = async (usernmae) => {
  const res = conn
    .promise()
    .query('SELECT * FROM users WHERE username LIKE CONCAT("%", ?, "%")', [
      usernmae,
    ])
    .then(([rows, fields]) => {
      return rows;
    });
  return res;
};

const isFriend = async (fromUser, TargetUser) => {
  try {
    const checkFriends = conn
      .promise()
      .query(
        "SELECT * FROM friends WHERE fromuser = ? AND touser = ? OR touser = ? AND fromuser = ?",
        [fromUser, TargetUser, fromUser, TargetUser]
      )
      .then(([rows, fields]) => {
        if (rows.length >= 1) {
          return rows[0];
        } else {
          return false;
        }
      });

    return checkFriends;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const addUser = async (fromUser, toUser, status) => {
  const uniqueID = uuidv4();
  const addedDate = new Date();
  conn.execute(
    "INSERT INTO friends (friend_ID,fromUser,toUser,status,lastActivity) VALUES (?,?,?,?,?)",
    [uniqueID, fromUser, toUser, status, addedDate]
  );
};

const updateFriend = (Column, Value, UserID) => {
  conn.query("UPDATE friends SET ?? = ? WHERE friend_ID = ?", [
    Column,
    Value,
    UserID,
  ]);
};

const getAllFriendRequests = async (username) => {
  try {
    const res = conn
      .promise()
      .query("SELECT * FROM friends WHERE toUser = ? AND status= 'Pending' ", [
        username,
      ])
      .then(([rows, fields]) => {
        return rows;
      });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getAcceptedRequests = async (username) => {
  try {
    const res = conn
      .promise()
      .query(
        "SELECT * FROM friends WHERE status = 'Accepted' AND toUser = ? OR fromUser = ?",
        [username, username]
      )
      .then(([rows, fields]) => {
        return rows;
      });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const removeRequest = (UUID) => {
  conn.query("DELETE FROM friends WHERE friend_ID = ?", [UUID]);
};

const selectFromFriendID = async (friendID) => {
  try {
    const res = await conn
      .promise()
      .query("SELECT * FROM friends WHERE friend_ID = ?", [friendID])
      .then(([rows, fields]) => {
        if (rows.length > 0) return rows[0];
        return false;
      });
    return res;
  } catch (err) {
    return false;
  }
};
const verifyID = async (friendID, fromUser) => {
  let found = false;

  const friendObj = await selectFromFriendID(friendID);
  if (friendObj != false) {
    for (const [key, value] of Object.entries(friendObj)) {
      if (value === fromUser) {
        // Perform actions with the matched key-value pair
        found = true;
        break; // Exit the loop once a match is found
      }
    }
    if (!found) {
      return false;
    }
  } else {
    return false;
  }
  return found;
};
const sendMessage = (chatID, fromUser, toUser, message) => {
  try {
    const date = new Date();
    const UUID = uuidv4();
    const query =
      "INSERT INTO useractivities.messages (messageid,chatid,fromuser,message,touser,date_column) VALUES(?,?,?,?,?,?)";
    client.execute(query, [UUID, chatID, fromUser, message, toUser, date], {
      prepare: true,
    });
  } catch (err) {
    console.log(err);
  }
};
const getMessageData = async (id) => {
  const query =
    "SELECT * FROM useractivities.messages WHERE chatid = ? ALLOW FILTERING;";
  const showItems = await client.execute(query, [id], { prepare: true });
  return showItems.rows;
  // client.execute
};
module.exports = {
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
  verifyID,
  sendMessage,
  selectFromFriendID,
  getMessageData,
};
