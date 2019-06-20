const axios = require('axios')
const {convertDate, float} = require('../utils/timeUtils')

class mercadobitcoinApi{
    constructor(coin=undefined){
        this._endpoint = 'https://www.mercadobitcoin.net/api/';
        this._coin = coin;
        this.endpointCoin = this.endpoint+this.coin
        this._realNameCoin = this.discoverName()
    }

    get endpoint(){
        return this._endpoint;
    }

    get coin(){
        return this._coin.toUpperCase();
    }

    set coin(newCoin){
        this._coin = newCoin
    }

    discoverName(){
        switch(this.coin){
            case "LTC":
                return "Litecoin"
            case "BTC":
                return "Bitcoin"
            case "XRP": 
                return "Ripple"
        }
    }

    async requestTickerCoin() {
        try{
            const response = await axios.get(this.endpointCoin+`/ticker`)
            return response.data
        }catch(err){
            return err
            console.log('error')
        }
    }

    renderCoin(data){
        let date = convertDate()
        let ultimoValor = float(data.ticker.last).toFixed(2)
        let maxValor24 = float(data.ticker.high).toFixed(2)
        let highValue = `\nMaior valor nas ultimas 24h: <b>R$${maxValor24}</b>`
        let atualValue = `\nValor atual: <b>R$${ultimoValor}</b>`
        let textOperation = `$${this.coin} <b>${this.discoverName()} --- ${date}</b>${highValue}${atualValue}`
        return textOperation
    }

}

module.exports = mercadobitcoinApi