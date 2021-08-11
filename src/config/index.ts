import { Telegraf } from "telegraf";
import TelegrafContext from "telegraf/typings/context";
import * as dotenv from "dotenv";

let bot: Telegraf<TelegrafContext>;

if (process.env.NODE_ENV !== "prd") {
  console.log("DEVELOPER AREA");
  dotenv.config();
  bot = new Telegraf(process.env.TOKEN_BOT_AUTH);
} else {
  console.log("PRODUCTION AREA");
  bot = new Telegraf(process.env.TOKEN_BOT_AUTH);
}

export default bot;
