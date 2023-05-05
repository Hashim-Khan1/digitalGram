function routes(app, { urlencodedParser }) {
  app.use("/user", urlencodedParser, require("./user"));
  app.use("/token", urlencodedParser, require("./Token"));
  app.use("/post", urlencodedParser, require("./post"));
}
module.exports = routes;
