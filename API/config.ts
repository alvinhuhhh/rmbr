require("dotenv").config();

interface Config {
  port: number;
  dbConnectionString: string;
}

const config: Config = {
  port: typeof process.env.PORT === "number" ? process.env.PORT : 3000,
  dbConnectionString: typeof process.env.DB_CONNECTION_STRING === "string" ? process.env.DB_CONNECTION_STRING : "",
};

export default config;
