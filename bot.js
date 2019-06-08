const bot = require('./config')


bot.on(['/start', '/hello'], (msg) =>{
    const texto = `Bem vindo ao bot (não-oficial) para consultas criptomoedas do Mercado Bitcoin\nConsulte a sua moeda de preferência pode ser /LTC /BTC /XRP!`
    msg.reply.text(`Olá ${msg.chat.username} , ${texto}`)
});

bot.on(['/ltc','/LTC', '/litecoin'], (msg) =>{
    const textoLtc =  `Você escolheu LITECOIN`
    msg.reply.text(`${textoLtc}`)
})

bot.on(['/btc','/BTC', '/bitcoin'], (msg) =>{
    const textoBtc =  `Você escolheu BITCOIN`
    msg.reply.text(`${textoBtc}`)
})


bot.start();