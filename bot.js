const mercadoApi = require('./src/controllers/daoRequests')

const TeleBot = require('telebot');
let bot;

if(process.env.NODE_ENV !== 'prd'){
    require('dotenv').config();
    bot = new TeleBot(process.env.TOKEN_BTC)
}else{
    bot = new TeleBot({token:process.env.TOKEN_BTC, 
        usePlugins: ['commandButton'],
        webhook: { // Optional. Use webhook instead of polling.
            url: 'https://stock-mercado-bitcoin-bot.herokuapp.com', // HTTPS url to send updates to.
            host: '0.0.0.0', // Webhook server host.
            port: 443, // Server port.
            maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
        }
    })
}


bot.on(['/start', '/hello'], (msg) =>{
    const texto = `Bem vindo ao bot (não-oficial) para consultas criptomoedas do Mercado Bitcoin!`
        // Inline keyboard markup
        const replyMarkup = bot.inlineKeyboard([
            [
                // First row with command callback button
                bot.inlineButton('Litecoin', {callback: '/ltc'})
            ],
            [
                // Second row with regular command button
                bot.inlineButton('Bitcoin', {callback: '/btc'})
            ],
            [
                // Second row with regular command button
                bot.inlineButton('Ripple', {callback: '/xrp'})
            ]
        ]);
    
        // Send message with keyboard markup
        msg.reply.text()
        return bot.sendMessage(msg.from.id, `Olá ${msg.chat.username} , ${texto}\nEssas são as criptomoedas:\n`, {replyMarkup});
});


bot.on('/menu', msg => {

    // Inline keyboard markup
    const replyMarkup = bot.inlineKeyboard([
        [
            // First row with command callback button
            bot.inlineButton('Litecoin', {callback: '/ltc'})
        ],
        [
            // Second row with regular command button
            bot.inlineButton('Bitcoin', {callback: '/btc'})
        ],
        [
            // Second row with regular command button
            bot.inlineButton('Ripple', {callback: '/xrp'})
        ]
    ]);

    // Send message with keyboard markup
    return bot.sendMessage(msg.from.id, 'Essas são as criptomoedas:\n', {replyMarkup});
});



bot.on(['/ltc','/LTC', '/litecoin'], async (msg) =>{
    try{
        const data = new mercadoApi('ltc')
        let response = await data.requestTickerCoin()
        let textoLtc =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoLtc}`, {parseMode:'html'})
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim, espere mais um tempo e tente novamente`)
    }
})

bot.on(['/btc','/BTC', '/bitcoin'], async(msg) =>{
    try{
        const data = new mercadoApi('btc')
        let response = await data.requestTickerCoin()
        let textoLtc =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoLtc}`, {parseMode:'html'})
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim, espere mais um tempo e tente novamente`)
    }
})

bot.on(['/xrp','/XRP', '/ripple'], async (msg) =>{
    try{
        const data = new mercadoApi('xrp')
        let response = await data.requestTickerCoin()
        let textoOp =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoOp}`, {parseMode:'html'})
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim, espere mais um tempo e tente novamente`)
    }
})

module.exports = bot;