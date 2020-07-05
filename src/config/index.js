const Telegraf = require("telegraf");
let bot;
if (process.env.NODE_ENV !== "prd") {
  require("dotenv").config();
  bot = new Telegraf(process.env.TOKEN_BTC);
} else {
  bot = new Telegraf(process.env.TOKEN_BTC, {
    telegram: {
      webhookReply: false,
    },
  });
}

module.exports = bot;
