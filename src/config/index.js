const Telegraf = require("telegraf");
let bot;
if (process.env.NODE_ENV !== "prd") {
  console.log("DEVELOPER AREA");
  require("dotenv").config();
  bot = new Telegraf(process.env.TOKEN_BTC);
} else {
  console.log("PRODUCTION AREA");
  bot = new Telegraf(process.env.TOKEN_BTC);
}

module.exports = bot;
