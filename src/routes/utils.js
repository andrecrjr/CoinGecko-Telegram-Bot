const criptoApi = require("../controllers/daoRequests");

const getCryptoApi = async (cryptoSymbol, cryptoName) => {
  try {
    const data = new criptoApi(cryptoSymbol, cryptoName);
    return data.renderCoin();
  } catch (err) {
    console.log(err);
  }
};

module.exports = getCryptoApi;
