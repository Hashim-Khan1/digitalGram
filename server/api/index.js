function routes(app, { urlencodedParser }) {
  app.use("/user", urlencodedParser, require("./user"));
  app.use("/token", urlencodedParser, require("./Token"));
}
module.exports = routes;
