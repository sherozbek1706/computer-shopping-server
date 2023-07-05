const db = require("../../db");
const express = require("express");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

// POST

const postBrands = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newBrand = await db("brands").insert({ name }).returning("*");

    res.status(201).json({ newBrand });
  } catch (error) {
    next(error);
  }
};

// GET

const getBrands = async (req, res, next) => {
  try {
    const allBrands = await db("brands");

    res.status(200).json({ allBrands });
  } catch (error) {
    next(error);
  }
};

// DELETE

const deleteBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      throw new NotFoundError("Brand not found!");
    }

    const deletedBrand = await db("brands")
      .where({ id })
      .delete()
      .returning("*");

    res.status(200).json({ deletedBrand: deletedBrand[0] });

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

// UPDATE

const updateBrands = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      throw new NotFoundError("Brand not found!");
    }

    const updatedBrand = await db("brands")
      .where({ id })
      .update({ ...changes })
      .returning("*");

    res.status(200).json({ updatedBrand: updatedBrand[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postBrands,
  getBrands,
  deleteBrands,
  updateBrands,
};
