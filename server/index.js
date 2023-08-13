const app = require("express")();
const http = require("http");
const WebSocket = require("ws");
const chat = require("./chat/chat");
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

// Attach the WebSocket upgrade handling to the Express HTTP server manually
server.on("upgrade", (req, socket, head) => {
  const urlsplit = req.url.split("/");
  if (urlsplit[1] == "Inbox" && urlsplit.length == 4) {
    chat.handleUpgrade(req, socket, head, (ws) => {
      chat.emit("connection", ws, req, urlsplit[3]);
    });
  } else {
    socket.destroy();
  }
});
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
