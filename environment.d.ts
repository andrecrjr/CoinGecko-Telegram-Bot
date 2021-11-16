declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "dev" | "prd";
		PORT?: string;
		TOKEN_BOT_AUTH: string;
		SERVER_URL: string;
	}
}
