import criptoApi from "../controllers/daoRequests";

export const getCryptoApi = async (cryptoSymbol) => {
  try {
    const data = new criptoApi(cryptoSymbol);
    return data.renderCoin();
  } catch (err) {
    console.log(err);
  }
};

export let cryptos = {
  BTC: "Bitcoin",
  BAT: "Basic attention token",
  LTC: "Litecoin",
  XRP: "Ripple",
};
