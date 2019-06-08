const bot = require('./config')
const mercadoApi = require('./src/controllers/daoRequests')

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
        bot.sendMessage(msg.from.id, `Deu ruim, espere mais um tempo e tente novamente`)
    }
})

bot.start();