const TelegrafInlineMenu = require("telegraf-inline-menu");
const cryptos = require("../config/cryptoObject");
const getCryptoApi = require("./utils");
const Markup = require("telegraf/markup");

const showMenu = new TelegrafInlineMenu(
  `Atualmente temos algumas moedas em nosso menu, poderá listá-las pressionando o botão abaixo`
);
const listCrypto = new TelegrafInlineMenu(
  "> A moeda escolhida aparecerá aqui <"
);

showMenu.submenu("Listar criptomoedas", "show_menu", listCrypto);

for (let crypto in cryptos) {
  listCrypto.simpleButton(
    `${crypto} - ${cryptos[crypto]}`,
    `crypto_menu_${crypto}`,
    {
      doFunc: async (msg) => {
        try {
          await msg.editMessageText(
            await getCryptoApi(crypto, cryptos[crypto]),
            {
              reply_markup: new Markup().inlineKeyboard(
                msg.callbackQuery.message.reply_markup.inline_keyboard
              ),
              parse_mode: "html",
            }
          );
          //stop the eternal loading with callbackQuery
          await msg.answerCbQuery(`Price for ${crypto}`);
        } catch (e) {
          console.log(e);
        }
      },
    }
  );
}

showMenu.setCommand("menu");

module.exports = showMenu;
