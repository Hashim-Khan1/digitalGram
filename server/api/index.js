const bodyParser = require("body-parser");

function routes(app, { urlencodedParser }) {
  app.use("/user", urlencodedParser, require("./user"));
}
module.exports = routes;
