const TeleBot = require("telebot");
if (process.env.NODE_ENV !== "prd") {
  require("dotenv").config();
  bot = new TeleBot({
    token: process.env.TOKEN_BTC,
    usePlugins: ["commandButton"],
  });
} else {
  bot = new TeleBot({
    token: process.env.TOKEN_BTC,
    usePlugins: ["commandButton"],
  });
}

module.exports = bot;
