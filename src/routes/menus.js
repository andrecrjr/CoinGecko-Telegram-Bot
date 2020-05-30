const TelegrafInlineMenu = require("telegraf-inline-menu");
const cryptos = require("../config/cryptoObject");
const getCryptoApi = require("./utils");
const Markup = require("telegraf/markup");

const showMenu = new TelegrafInlineMenu(
  `We have all the coins from geckocoin.com but this is the trend`
);
const listCrypto = new TelegrafInlineMenu("Your coin will show up here");

showMenu.submenu("Listar criptomoedas", "show_menu", listCrypto);

for (let crypto in cryptos) {
  listCrypto.simpleButton(
    `${crypto} - ${cryptos[crypto]}`,
    `crypto_menu_${crypto}`,
    {
      doFunc: async (msg) => {
        try {
          console.log(crypto);
          await msg.editMessageText(await getCryptoApi(crypto), {
            reply_markup: new Markup().inlineKeyboard(
              msg.callbackQuery.message.reply_markup.inline_keyboard
            ),
            parse_mode: "html",
          });
          //stop the eternal loading with callbackQuery
          await msg.answerCbQuery(`Price for ${crypto}`);
        } catch (e) {
          console.log(e);
        }
      },
    }
  );
}

listCrypto.simpleButton("Commands cryptocurrency", "link_criptocurrency", {
  doFunc: (msg) => {
    msg.reply("If its not in button, try the commands:", {
      reply_markup: new Markup().inlineKeyboard([
        [
          new Markup().urlButton(
            "All cryptocurrency commands",
            "https://geckocoin-bot-telegram.herokuapp.com/commands"
          ),
        ],
      ]),
    });
  },
});
showMenu.setCommand("menu");

module.exports = showMenu;
