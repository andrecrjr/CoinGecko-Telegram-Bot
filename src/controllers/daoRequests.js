import Axios from "axios";

class mercadobitcoinApi{
    constructor(coin=undefined){
        this._endpoint = 'https://www.mercadobitcoin.net/api/';
        this._coin = coin;


    }

    get endpoint(){
        return this.__endpoint;
    }

    get coin(){
        return this._coin.toUpperCase();
    }

    set coin(newCoin){
        this._coin = newCoin
    }

    requestCoin = async() => {
        try{
            const data = await Axios(this.getEndpoint()+this.coin())
            console.log(data)
        }catch{
            console.log('error')
        }
    }
}