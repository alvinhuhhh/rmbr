const config = {
  port: typeof process.env.PORT === "string" ? parseInt(process.env.PORT) : 0,
  dbConnectionString: typeof process.env.DB_CONNECTION_STRING === "string" ? process.env.DB_CONNECTION_STRING : "",
};

export default config;
