const knex = require("knex");
const config = require("../shared/config");

const db = knex({
  client: "postgresql",
  connection: {
    database: config.DB.DB_DATABASE,
    user: config.DB.DB_USERNAME,
    password: config.DB.DB_PASSWORD,
    port: config.DB.DB_PORT,
  },
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = db;
