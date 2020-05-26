const axios = require("axios");
const { convertDate, float } = require("../utils/timeUtils");

class criptoApi {
  constructor(coin = undefined, coinName = undefined) {
    this._endpoint =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=";
    this._coin = coin;
    this.coinName = coinName;
    this.endpointCoin = `${this.endpoint}${this.slugifyApi()}`;
  }

  get endpoint() {
    return this._endpoint;
  }

  get coin() {
    return this._coin.toUpperCase();
  }

  set coin(newCoin) {
    this._coin = newCoin;
  }

  slugifyApi() {
    return this.coinName.toLowerCase().split(" ").join("-");
  }

  async requestTickerCoin() {
    try {
      const response = await axios.get(this.endpointCoin);
      return response.data;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  async renderCoin() {
    const data = await this.requestTickerCoin();
    let date = convertDate();
    const { high_24h, low_24h, current_price } = data[0];
    let textOperation = `
$${this.coin} | ${this.coinName} | ${date}\n
Valor atual: <b>R$${float(current_price)}</b>
Maior valor nas ultimas 24h: <b>R$${
      high_24h ? float(high_24h) : "Not defined, try again later"
    }</b>
Menor valor nas ultimas 24h: <b>R$${
      low_24h ? float(low_24h) : "Not defined,  try again later"
    }</b>
`;

    return textOperation;
  }
}

module.exports = criptoApi;
