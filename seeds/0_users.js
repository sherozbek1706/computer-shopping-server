/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { hashSync } = require("bcrypt");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Capitan",
      last_name: "America",
      role: "admin",
      image: "#1_cap.png",
      username: "cap.america",
      password: hashSync("1234", 10),
    },
  ]);
};
