const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT,
  DB: {
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
  },
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = config;
