/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("models", (table) => {
    table
      .integer("brand_id")
      .references("id")
      .inTable("brands")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("models", (table) => {
    table.dropColumn("brand_id");
  });
};
