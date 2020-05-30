const criptoApi = require("../controllers/daoRequests");

const getCryptoApi = async (cryptoSymbol) => {
  try {
    const data = new criptoApi(cryptoSymbol);
    return data.renderCoin();
  } catch (err) {
    console.log(err);
  }
};

module.exports = getCryptoApi;
