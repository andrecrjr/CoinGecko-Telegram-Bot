import { mainMenu } from "./menus";
import { getCryptoApi } from "../utils";
import bot from "../config";
import { Markup } from "telegraf";

const texto = (msg: string | undefined) => `Welcome ${
  msg || ``
} to GeckoCoin (unoficial) Bot! created by @andrecrjr.
\n/menu - Open menu\ntip:You can choose any symbol cryptocurrency, just call /btc for example!`;

const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback(
      "All cryptocurrency commands",
      `${process.env.COMMANDS_URL}`,
      false
    ),
  ],
]).reply_markup;

bot.start((msg) =>
  msg.replyWithHTML(texto(msg.from.username), {
    disable_web_page_preview: true,
  })
);
bot.catch((err, msg) => {
  msg.reply("Sorry i didn't understand what you said!?");
  console.log(err);
});
bot.use(mainMenu);

bot.on("text", async (msg) => {
  console.log(msg);
  if (msg.message.entities && msg.message.entities[0].type === "bot_command") {
    if (msg.message.text)
      msg.reply((await getCryptoApi(msg.message.text.replace("/", ""))) || "", {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
  }
});

export default bot;
