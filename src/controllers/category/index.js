const db = require("../../db");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

/**
 *
 * POST
 */
const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await db("categories").insert({ name }).returning("*");

    res.status(201).json({ newCategory });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * GET
 */
const getCategory = async (req, res, next) => {
  try {
    const allCategory = await db("categories");

    res.status(200).json({ allCategory });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * DELETE
 */

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      throw new NotFoundError("Category not found!");
    }

    const deletedCategory = await db("categories")
      .where({ id })
      .delete()
      .returning("*");

    res.status(200).json({ deletedBrand: deletedCategory[0] });

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Update Category
 */

const updateCategory = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      throw new NotFoundError("Category not found!");
    }

    const updatedCategory = await db("categories")
      .where({ id })
      .update({ ...changes })
      .returning("*");

    res.status(200).json({ updatedCategory: updatedCategory[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};
