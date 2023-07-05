/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("computers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.float("price").notNullable();
    table.date("year").notNullable();
    table.string("image", 320).notNullable();
    table.integer("brand_id").references("id").inTable("brands");
    table.integer("category_id").references("id").inTable("categories");
    table.integer("model_id").references("id").inTable("models");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.createTable("computers");
};
