const criptoApi = require("../controllers/daoRequests");

const getCryptoApi = async (bot, cryptoName, msg) => {
  try {
    const data = new criptoApi(cryptoName);
    return data.renderCoin(bot, msg);
  } catch (err) {
    console.log(err);
    bot.sendMessage(
      msg.from.id,
      `Deu ruim, espere mais um tempo e tente novamente`
    );
  }
};

module.exports = getCryptoApi;
