const { WebSocketServer, WebSocket } = require("ws");
const { v4: uuidv4 } = require("uuid");
const { sendMessage } = require("../model/users");
const chat = new WebSocket.Server({ noServer: true, clientTracking: false });
//Define an empty object
const rooms = {};
chat.on("connection", (ws, req, messageID) => {
  // Handle WebSocket messages and events
  //Make a unique id for the socket id
  ws.id = uuidv4();
  //This is the the room ID
  const room = messageID;
  //Create the room here
  if (!rooms[room]) rooms[room] = {};
  //This will be an empty objecty
  // console.log(rooms[room]);
  //Join the room
  rooms[room] = { ...rooms[room], [ws.id]: ws };
  //This will be a room with an id, multiple people can have same ID now
  // console.log(rooms[room]);
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    const { userMessage, toUser, fromUser } = parsedMessage;
    sendMessage(messageID, fromUser, toUser, userMessage);

    //Sending the message to the websocket
    Object.values(rooms[room]).forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });
});
module.exports = chat;
