/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("brands").del();
  await knex("brands").insert([
    {
      // id:1,
      name: "ASUS",
    },
    {
      // id:2,
      name: "MSI",
    },
    {
      // id:3,
      name: "LENOVO",
    },
    {
      // id:4,
      name: "HP",
    },
    {
      // id:5,
      name: "DELL",
    },
    {
      // id:6,
      name: "RAZER",
    },
    {
      // id:7,
      name: "SAMSUNG",
    },
  ]);
};
