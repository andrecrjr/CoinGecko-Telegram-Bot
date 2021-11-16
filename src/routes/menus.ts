import { cryptos } from "../utils";
import { getCryptoApi } from "../utils";
import { Markup } from "telegraf";
import { Context as BaseContext } from "telegraf";
import { MenuTemplate, MenuMiddleware } from "telegraf-inline-menu";
type MyContext = BaseContext & { match: RegExpExecArray | undefined };

const showMenu = new MenuTemplate<MyContext>(
	(ctx) => `We have all the coins from geckocoin.com but this is the trend`
);
const listCrypto = new MenuTemplate<MyContext>("Your coin will show up here");

showMenu.submenu("Listar criptomoedas", "show_menu", listCrypto);

for (let crypto in cryptos) {
	listCrypto.interact(
		`${crypto} - ${cryptos[crypto]}`,
		`crypto_menu_${crypto}`,
		{
			do: async (msg) => {
				try {
					await msg.editMessageText((await getCryptoApi(crypto)) || "");
					//stop the eternal loading with callbackQuery
					await msg.answerCbQuery(`Price for ${crypto}`);
					return true;
				} catch (e) {
					console.log(e);
					return false;
				}
			},
		}
	);
}

listCrypto.interact("Commands cryptocurrency", "link_criptocurrency", {
	do: (msg) => {
		msg.reply("If its not in button, try the commands:", {
			reply_markup: Markup.inlineKeyboard([
				[
					Markup.button.callback(
						"All cryptocurrency commands",
						`${process.env.SERVER_URL}/commands`
					),
				],
			]).reply_markup,
		});
		return true;
	},
});
// showMenu.setCommand("menu");

export const mainMenu = new MenuMiddleware("/", showMenu);
