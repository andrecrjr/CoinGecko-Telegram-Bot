const bot = require("../config");
const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const texto = (
  msg
) => `Bem vindo ${msg.from.username} ao bot (não-oficial) para consultas em criptomoedas do GeckoCoin! created by @andrecrjr.
\n <a href="https://brave.com/eel072">Use Brave Browser para ganhar tokens BAT</a>\n
Use /menu - Acesse nosso menu.`;

module.exports = () => {
  bot.start((msg) =>
    msg.replyWithHTML(texto(msg), { disable_web_page_preview: true })
  );
  bot.use(showMenu.init());
  bot.startPolling();
};
