const app = require("express")();
const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require("./api/index");
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
routes(app, { urlencodedParser });

const PORT = 3000;

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
    console.log("Recieved message" + parsedMessage);
    console.log(parsedMessage);

    //Sending the message to the websocket
    Object.values(rooms[room]).forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // const {} = JSON.parse(message);
        client.send("Got ur message");
      }
    });
  });
});

// Attach the WebSocket upgrade handling to the Express HTTP server manually
server.on("upgrade", (req, socket, head) => {
  console.log(req.url, "SSSS");
  const urlsplit = req.url.split("/");
  if (urlsplit[1] == "Inbox" && urlsplit.length == 4) {
    chat.handleUpgrade(req, socket, head, (ws) => {
      chat.emit("connection", ws, req, urlsplit[3]);
    });
  }
});
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
