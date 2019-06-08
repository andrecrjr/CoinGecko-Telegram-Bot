const TeleBot = require('telebot');

if(process.env.NODE_ENV !== 'prd'){
    require('dotenv').config();
}

const bot = new TeleBot({token:process.env.TOKEN_BTC, usePlugins: ['commandButton']})

module.exports = bot