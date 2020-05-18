const axios = require("axios");
const { convertDate, float } = require("../utils/timeUtils");

class criptoApi {
  constructor(coin = undefined) {
    this._endpoint =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=";
    this._coin = coin;
    this.endpointCoin = `${this.endpoint}${this.discoverName()}`;
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

  discoverName() {
    switch (this.coin) {
      case "LTC":
        return "litecoin";
      case "BTC":
        return "bitcoin";
      case "XRP":
        return "ripple";
      case "BAT":
        return "basic-attention-token";
    }
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

  async renderCoin(bot, msg) {
    const data = await this.requestTickerCoin();
    const { high_24h, current_price, image, low_24h } = data[0];
    let date = convertDate();
    let highValue = `\nMaior valor nas ultimas 24h: <b>R$${float(
      high_24h
    ).toFixed(2)}</b>`;
    let lowValue = `\nMenor valor nas ultimas 24h: <b>R$${float(
      low_24h
    ).toFixed(2)}</b>`;
    let currentValue = `\nValor atual: <b>R$${float(current_price).toFixed(
      2
    )}</b>`;
    let nowTime = `Hora: ${date}\n`;
    let textOperation = `${nowTime}${currentValue}${highValue}${lowValue}`;

    bot.sendPhoto(msg.from.id, image, {
      caption: `${this.coin}${textOperation}`,
      parseMode: "html",
      replyToMessage: true,
    });
  }
}

module.exports = criptoApi;
