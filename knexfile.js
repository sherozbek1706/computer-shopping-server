// Update with your config settings.
const config = require("./src/shared/config");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: config.DB.DB_DATABASE,
      user: config.DB.DB_USERNAME,
      password: config.DB.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: config.DB.DB_DATABASE,
      user: config.DB.DB_USERNAME,
      password: config.DB.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: config.DB.DB_DATABASE,
      user: config.DB.DB_USERNAME,
      password: config.DB.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
