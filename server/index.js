const app = require("express")();
const http = require("http");
const WebSocket = require("ws");

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

const chat = new WebSocket.Server({ noServer: true });

chat.on("connection", (ws, req, d) => {
  // Handle WebSocket messages and events
  console.log("connected");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("Received message:", parsedMessage);
  });
});

// Attach the WebSocket upgrade handling to the Express HTTP server manually
server.on("upgrade", (req, socket, head) => {
  console.log(req.url);
  chat.handleUpgrade(req, socket, head, (ws) => {
    chat.emit("connection", ws, req);
  });
});
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
