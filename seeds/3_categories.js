/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    {
      // id:1,
      name: "Notebook",
    },
    {
      // id:2,
      name: "Gaming Notebook",
    },
    {
      // id:3,
      name: "Ultrabook",
    },
    {
      // id:4,
      name: "Transformer",
    },
    {
      // id:5,
      name: "Notebook for business",
    },
    {
      // id:6,
      name: "PK",
    },
  ]);
};
