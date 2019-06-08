const TeleBot = require('telebot');
let bot;
const token = process.env.TOKEN_BTC;

if(process.env.NODE_ENV !== 'prd'){
    require('dotenv').config();
    bot = new TeleBot(token)
}else{
    bot = new TeleBot({token:token, 
        usePlugins: ['commandButton'],
        webhook: { // Optional. Use webhook instead of polling.
            url: 'https://stock-mercado-bitcoin-bot.herokuapp.com', // HTTPS url to send updates to.
            host: '0.0.0.0', // Webhook server host.
            port: 443, // Server port.
            maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
        }
    })
}

module.exports = bot