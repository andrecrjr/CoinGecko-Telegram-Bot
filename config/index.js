const TeleBot = require('telebot');

if(process.env.NODE_ENV !== 'prd'){
    require('dotenv').config();
}

const bot = new TeleBot(process.env.TOKEN_BTC)

module.exports = bot