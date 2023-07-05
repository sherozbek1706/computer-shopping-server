/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("models").del();
  await knex("models").insert([
    {
      // id:1,
      name: "TUF Gaming 17",
      brand_id: 1,
    },
    {
      // id:2,
      name: "Asus laptop",
      brand_id: 1,
    },
    {
      // id:3,
      name: "Asus Vivobook",
      brand_id: 1,
    },
    {
      // id:4,
      name: "STEALTH 17 Studio A13V",
      brand_id: 2,
    },
    {
      // id:5,
      name: "LEGION",
      brand_id: 3,
    },
    {
      // id:6,
      name: "iDEPAD",
      brand_id: 3,
    },
    {
      // id:7,
      name: "THINKPAD",
      brand_id: 3,
    },
    {
      // id:8,
      name: "HP ENVY",
      brand_id: 4,
    },
    {
      // id:9,
      name: "HP VICTUS",
      brand_id: 4,
    },
    {
      // id:8,
      name: "HP Laptop",
      brand_id: 4,
    },
    {
      // id:9,
      name: "HP Spectre",
      brand_id: 4,
    },
    {
      // id:10,
      name: "DELL ALIENWARE",
      brand_id: 5,
    },
    {
      // id:11,
      name: "DELL XPS",
      brand_id: 5,
    },
    {
      // id:12,
      name: "RAZER TM",
      brand_id: 6,
    },
  ]);
};
