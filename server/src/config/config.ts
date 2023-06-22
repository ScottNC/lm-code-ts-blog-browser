export type Config = {
	environment: string;
	port: number;
	isDev: boolean;
	privateKey: string;
};

let config: Config;

export function getConfig(): Config {
	if (!config) {
		initialiseConfig();
	}

	return config;
}

function initialiseConfig() {
	const environment = process.env.NODE_ENV ?? "development";
	const isDev = environment === "development";

	console.log(`📟 Initialising config for the '${environment}' environment...`);

	config = {
		environment: environment,
		isDev: isDev,
		port: Number(process.env.PORT ?? 8080),
		privateKey: "somePrivateKeyLoadedFromASecretFile",
	};
}
