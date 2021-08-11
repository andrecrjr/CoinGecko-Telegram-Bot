import showMenu from "./menus";
import { getCryptoApi } from "../utils";
import bot from "../config";
import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/lib/telegram-types";

const texto = (
  msg
) => `Welcome ${msg.from.username} to GeckoCoin (unoficial) Bot! created by @andrecrjr.
      \n <a href="https://brave.com/eel072">Use Brave Browser BAT tokens</a>\n
      /menu - Open menu\ntip:You can choose any symbol cryptocurrency, just call /btc for example!`;

const keyboard = [
  [
    Markup.button.callback(
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
//bot.use(showMenu.init());

bot.on("text", async (msg) => {
  if (msg.message.entities[0].type === "bot_command") {
    msg.reply(await getCryptoApi(msg.message.text.replace("/", "")), {
      reply_markup: Markup.inlineKeyboard(keyboard) as InlineKeyboardMarkup,
    });
  }
});
