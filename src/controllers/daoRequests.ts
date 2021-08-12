const axios = require("axios");
import { convertDate, float } from "../utils/timeUtils";

type coinData = {
  id: string;
  symbol: string;
  name: "";
  low_24: number;
  high_24: number;
};

class criptoApi {
  _endpoint: string;
  _coin: string;
  coinData: coinData;
  constructor(coin = "") {
    this._endpoint =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
    this._coin = coin;
    this.coinData = { id: "", symbol: "", name: "", low_24: 0, high_24: 0 };
  }

  get endpoint() {
    return this._endpoint;
  }

  get coin() {
    return this._coin.toLowerCase();
  }

  set coin(newCoin) {
    this._coin = newCoin;
  }

  async getCoinData() {
    const { data }: { data: coinData[] } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        cache: {
          maxAge: 2 * 60 * 500,
        },
      }
    );
    return data.filter(
      (filterCoin: coinData) => filterCoin.symbol === this.coin
    );
  }

  async requestTickerCoin() {
    try {
      const coinData = await this.getCoinData();
      this.coinData = coinData[0];
      const response = await axios.get(this.endpoint + this.coinData.id);
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
$${this.coinData.symbol} | ${this.coinData.name} | ${date}\n
Current price: <b>U$${float(current_price)}</b>
Highest value in 24h: <b>${
      high_24h ? `U$${float(high_24h)}` : "Not defined, try again later"
    }</b>
Lowest price in 24h : <b>${
      low_24h ? `U$${float(low_24h)}` : "Not defined,  try again later"
    }</b>
`;

    return textOperation;
  }
}

export default criptoApi;
