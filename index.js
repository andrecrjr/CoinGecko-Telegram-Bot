let express = require("express");
let path = require("path");
let app = express();

app.get("/", function (req, res) {
  require("./src/routes/bot")();

  res.sendFile(path.join(__dirname + "/website/index.html"));
});
app.get("/commands", (req, res) => {
  res.sendFile(path.join(__dirname + "/website/commands.html"));
});

let port = process.env.PORT || 3000;

let server = app.listen(port, "0.0.0.0", function () {
  console.log(
    `Funcionando ${server.address().address}:${server.address().port}`
  );
});
