import express from "express";
import path from "path";
import bot from "./routes/bot";
let app = express();
const CURRENT_URL = process.env.SERVER_URL;

if (process.env.NODE_ENV !== "prd") {
  console.log("DEV SECTION");
  bot.launch();
}

if (process.env.NODE_ENV === "prd") {
  bot.launch({
    webhook: {
      domain: process.env.SERVER_URL,
      port: Number(process.env.PORT),
    },
  });
}

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "../website", "index.html"));
});
app.get("/commands", (req, res) => {
  res.sendFile(path.join(__dirname, "../website", "commands.html"));
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", function () {
  console.log(`Funcionando na porta: ${process.env.PORT}`);
});
