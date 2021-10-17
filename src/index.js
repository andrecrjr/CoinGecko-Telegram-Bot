let express = require("express");
let path = require("path");
let bot = require("./config");
let app = express();
const CURRENT_URL = process.env.URL_HEROKU;

require("./routes/bot")(bot);

if (process.env.NODE_ENV !== "prd") {
	console.log("DEV SECTION");
	bot.telegram.deleteWebhook();
	bot.startPolling();
}

if (process.env.NODE_ENV === "prd") {
	app.use(bot.webhookCallback("/bot"));

	bot.telegram.setWebhook(`${CURRENT_URL}/bot`);
}

app.get("/", async function (req, res) {
	res.sendFile(path.join(__dirname, "../website", "index.html"));
});
app.get("/commands", (req, res) => {
	res.sendFile(path.join(__dirname, "../website", "commands.html"));
});

let port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {
	console.log(`Funcionando na porta: ${process.env.PORT}`);
});
