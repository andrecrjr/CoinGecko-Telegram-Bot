# Coingecko Telegram CryptoBot

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/andrecrjr/CoinGecko-Telegram-Bot/tree/develop)


`yarn start` - ran your server once - used by run in your VPS/Server host.
`yarn dev` - ran your server locally with changes.

# how it works

A telegram bot is just a web server that listens the bot events from telegram and in DEV mode is just a **pooling** from telegram (not cool for production bots), but in PRD mode its listening the webhook events direct from telegram (thankfully to [Telegraf](https://telegraf.js.org/v3#/) that helps with it).

You'll need to create a bot and get its private key to put in the environment file root `.env` *(just copy the .env.example and remove **.example**)*.

## Environment Variables
All the environment will be changed looking to variable `process.NODE_ENV = "prd"`, then it'll be **production** or `dev` it'll be your *local server* when you ran.

```
TOKEN_BTC=EXAMPLE_BOTFATHER_TOKEN - your token from botfather
PORT=3000 - just for local purposes.
URL_HEROKU=https://myapp.com/ - Where you deployed/hosted the telegram bot server (not just heroku, can be your vps ip for example the place you listen your port).
```

## Work in progress

* Update telegraf version to 4.
* Upgrade to typescript.
