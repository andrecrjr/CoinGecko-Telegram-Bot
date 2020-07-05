let express = require("express");
let path = require("path");
let bot = require("./src/config");
let app = express();
const CURRENT_URL = "https://geckocoin-bot-telegram.herokuapp.com";

app.use(bot.webhookCallback("/bot"));

app.get("/", async function (req, res) {
  await bot.telegram.setWebhook(`${CURRENT_URL}/bot`);
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
