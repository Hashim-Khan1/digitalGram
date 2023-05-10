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
const detectChange = async (
  userInputUsername,
  userInputEmail,
  fromClientUser
) => {
  const { username, email } = await isUserExists(fromClientUser);
  let res;
  switch (true) {
    case userInputUsername !== username && userInputEmail !== email:
      res = "change both";
      break;
    case userInputUsername !== username:
      res = "UsernameChange";
      break;
    case userInputEmail !== email:
      res = "Email Change";
      break;
    default:
      res = "no change";
      break;
  }
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
module.exports = {
  hashPassword,
  createUser,
  isUserExists,
  verifyPassword,
  createUserInfo,
  getUserInfoData,
  isAvailable,
};
