let express = require("express");
let path = require("path");
let bot = require("./config");
let app = express();
const CURRENT_URL = "https://geckocoin-bot-telegram.herokuapp.com";
const showMenu = require("./routes/menus");
const getCryptoApi = require("./routes/utils");

const Markup = require("telegraf/markup");

const texto = (
  msg
) => `Welcome ${msg.from.username} to GeckoCoin (unoficial) Bot! created by @andrecrjr.
\n <a href="https://brave.com/eel072">Use Brave Browser BAT tokens</a>\n
/menu - Open menu\ntip:You can choose any symbol cryptocurrency, just call /btc for example!`;

const keyboard = [
  [
    new Markup().urlButton(
      "All cryptocurrency commands",
      "https://geckocoin-bot-telegram.herokuapp.com/commands"
    ),
  ],
];

bot.start((msg) =>
  msg.replyWithHTML(texto(msg), { disable_web_page_preview: true })
);
bot.catch((err, msg) => {
  msg.reply("Sorry i didn't understand what you said!?");
  console.log(err);
});
bot.use(showMenu.init());
bot.on("text", async (msg) => {
  if (msg.message.entities[0].type === "bot_command") {
    msg.reply(await getCryptoApi(msg.message.text.replace("/", "")), {
      reply_markup: new Markup().inlineKeyboard(keyboard),
      parse_mode: "Html",
    });
  }
});

if (process.env.NODE_ENV !== "prd") {
  console.log("oops");
  bot.startPolling();
} else {
  console.log("oops");
  bot.startWebhook("/bot", null, process.env.PORT);
}

app.use(bot.webhookCallback("/bot"));
if (process.env.NODE_ENV === "prd") {
  bot.telegram.setWebhook(`${CURRENT_URL}/bot`);
}

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname + "/website/index.html"));
});
app.get("/commands", (req, res) => {
  res.sendFile(path.join(__dirname + "/website/commands.html"));
});

let port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {
  console.log(`Funcionando na porta: ${process.env.PORT}`);
});
