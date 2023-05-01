const app = require("express")();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require("./api/index");
routes(app, { urlencodedParser });

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
