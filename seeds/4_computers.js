/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("computers").del();
  await knex("computers").insert([
    {
      // id: 1,
      name: "Lenovo Cheer",
      price: "1500",
      year: "2022-04-22",
      image: "filename.jpg",
      brand_id: 3,
      category_id: 3,
      model_id: 7,
    },
    {
      // id: 2,
      name: "HP Avalon T",
      price: "1199",
      year: "2023-06-22",
      image: "filename.jpg",
      brand_id: 4,
      category_id: 4,
      model_id: 9,
    },
    {
      // id: 3,
      name: "Samsung J8",
      price: "759",
      year: "2021-08-24",
      image: "filename.jpg",
      brand_id: 7,
      category_id: 6,
      model_id: null,
    },
  ]);
};
