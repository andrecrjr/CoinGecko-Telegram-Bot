const bot = require('./config')
const mercadoApi = require('./src/controllers/daoRequests')

bot.on(['/start', '/hello'], (msg) =>{
    const texto = `Bem vindo ao bot (não-oficial) para consultas criptomoedas do Mercado Bitcoin\nConsulte a sua moeda de preferência pode ser /LTC /BTC /XRP!`
    msg.reply.text(`Olá ${msg.chat.username} , ${texto}`)
});

bot.on(['/ltc','/LTC', '/litecoin'], async (msg) =>{
    try{
        const data = new mercadoApi('ltc')
        let response = await data.requestTickerCoin()
        let textoLtc =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoLtc}`)
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim`)
    }
})

bot.on(['/btc','/BTC', '/bitcoin'], async(msg) =>{
    try{
        const data = new mercadoApi('btc')
        let response = await data.requestTickerCoin()
        let textoLtc =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoLtc}`)
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim`)
    }
})

bot.on(['/xrp','/XRP', '/ripple'], async (msg) =>{
    try{
        const data = new mercadoApi('xrp')
        let response = await data.requestTickerCoin()
        let textoOp =  data.renderCoin(response)
        bot.sendMessage(msg.from.id, `${textoOp}`)
    }catch(err){
        console.log(err)
        bot.sendMessage(msg.from.id, `Deu ruim, espere mais um tempo e tente novamente`)
    }
})


bot.start();