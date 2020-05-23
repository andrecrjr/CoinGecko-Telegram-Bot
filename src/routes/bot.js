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
/*
module.exports = () => {
  bot.on(["/start", "/hello"], (msg) => {
    // Inline keyboard markup
    const replyMarkup = bot.inlineKeyboard([
      [
        // First row with command callback button
        bot.inlineButton("Litecoin", { callback: "/ltc" }),
      ],
      [bot.inlineButton("Bitcoin", { callback: "/btc" })],
      [bot.inlineButton("Ripple", { callback: "/xrp" })],
      [bot.inlineButton("BAT", { callback: "/bat" })],
    ]);

    // Send message with keyboard markup
    msg.reply.text();
    return bot.sendMessage(msg.from.id, `Olá ${msg.chat.username} , ${texto}`, {
      replyMarkup,
      parseMode: "html",
    });
  });

  bot.on("/menu", (msg) => {
    // Inline keyboard markup
    const replyMarkup = bot.inlineKeyboard([
      [
        // First row with command callback button
        bot.inlineButton("Litecoin", { callback: "/ltc" }),
      ],
      [
        // Second row with regular command button
        bot.inlineButton("Bitcoin", { callback: "/btc" }),
      ],
      [
        // Second row with regular command button
        bot.inlineButton("Ripple", { callback: "/xrp" }),
      ],
    ]);

    // Send message with keyboard markup
    return bot.sendMessage(msg.from.id, "Essas são as criptomoedas:\n", {
      replyMarkup,
    });
  });

  bot.on(["/ltc", "/LTC", "/litecoin"], async (msg) => {
    return await getCryptoApi(bot, "ltc", msg);
  });

  bot.on(["/btc", "/BTC", "/bitcoin"], async (msg) => {
    return await getCryptoApi(bot, "btc", msg);
  });

  bot.on(["/xrp", "/XRP", "/ripple"], async (msg) => {
    return await getCryptoApi(bot, "xrp", msg);
  });

  bot.on(["/bat", "/BAT", "/brave", "/basic-attention-token"], async (msg) => {
    return await getCryptoApi(bot, "bat", msg);
  });

  bot.start();
};
*/
