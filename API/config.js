require("dotenv").config();

var config = {};

config.port = 3000;
config.dbConnectionString = process.env.DB_CONNECTION_STRING;

module.exports = config;
