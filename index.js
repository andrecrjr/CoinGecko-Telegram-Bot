let express = require("express");
let path = require("path");
let bot = require("./src/config");
let app = express();
const CURRENT_URL = "https://geckocoin-bot-telegram.herokuapp.com";

app.use(bot.webhookCallback("/bot"));

app.get("/", async function (req, res) {
  try {
    if (process.env.NODE_ENV === "prd") {
      await bot.telegram.setWebhook(`${CURRENT_URL}/bot`);
    } else {
      await bot.telegram.deleteWebhook(`${CURRENT_URL}/bot`);
      return require("./src/routes/bot");
    }
  } catch (e) {
    console.log(e);
  }
  res.sendFile(path.join(__dirname + "/website/index.html"));
});
app.get("/commands", (req, res) => {
  res.sendFile(path.join(__dirname + "/website/commands.html"));
});

let port = process.env.PORT || 3000;

let server = app.listen(port, "0.0.0.0", function () {
  console.log(`Funcionando ${server.address().address}:${process.env.PORT}`);
});
