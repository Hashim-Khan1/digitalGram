const app = require("express")();
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
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
