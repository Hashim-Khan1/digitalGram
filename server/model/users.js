const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const conn = mysql.createConnection(process.env.DATABASE_URL);

const isUserExists = async (username) => {
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
    userMessage: "",
    userStatus: "unsuccessful",
    change: changeWhat,
  };

  switch (changeWhat) {
    case "Change Both":
      changeEmail = await isAvailable("email", clientEmail);
      changeUsername = await isAvailable("username", clientUsername);
      if (changeEmail && changeUsername) {
        response.userMessage = "Both username and email are valid, updating";
        response.userStatus = "successful";
        updateUser("users", "email", clientUsername, userID);
        updateUser("users", "username", clientEmail, userID);
      } else if (!changeEmail && !changeUsername) {
        response.userMessage = "Both Username and Email are already in use";
      } else if (!changeUsername) {
        response.userMessage = "Username already taken";
      } else {
        response.userMessage = "Email already taken";
      }
      break;
    case "Username Change":
      changeUsername = await isAvailable("username", clientUsername);

      if (changeUsername) {
        updateUser("users", "username", clientEmail, userID);
        response.userMessage = "Username available, updating";
        response.userStatus = "successful";
      } else {
        response.userMessage = "Username taken";
      }
      break;
    case "Email Change":
      changeEmail = await isAvailable("email", clientEmail);

      if (changeEmail) {
        updateUser("users", "email", clientUsername, userID);
        response.userMessage = "Email available, updating";
        response.userStatus = "successful";
      } else {
        response.userMessage = "Email already in use";
      }
      break;
    default:
      response.userMessage = "No changes needed";
      break;
  }
  return response;
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
};
