const db = require("../../db");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

/**
 *
 * POST MODEL
 */
const postModel = async (req, res, next) => {
  try {
    const { brand_id } = req.params;
    const { name } = req.body;

    const existingBrand = await db("brands").where({ id: brand_id }).first();

    if (!existingBrand) {
      throw new NotFoundError("Brand not found!");
    }

    const newModel = await db("models")
      .insert({ name, brand_id })
      .returning("*");

    res.status(201).json({ newModel });
  } catch (error) {
    next(error);
  }
};

/**s
 *
 * GET MODEL
 */

const getModel = async (req, res, next) => {
  try {
    const { brand_id } = req.params;

    const existingBrand = await db("brands").where({ id: brand_id }).first();

    if (!existingBrand) {
      throw new NotFoundError("Brand not found!");
    }

    const brand_name = `${existingBrand.name} Models`;

    const allModel = await db("models").where({ brand_id });

    res.status(200).json({ model: brand_name, allModel });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * DELETE MODEL
 */

const deleteModel = async (req, res, next) => {
  try {
    const { brand_id, model_id } = req.params;

    const existingBrand = await db("brands").where({ id: brand_id }).first();
    const existingModel = await db("models").where({ id: model_id }).first();

    if (!existingBrand) {
      throw new NotFoundError("Brand not found!");
    } else if (!existingModel) {
      throw new NotFoundError("Model not found!");
    }

    await db("models").where({ id: model_id }).delete();

    res.status(200).json({ deletedModel: existingModel });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * UPDATE MODEL
 */

const updateModel = async (req, res, next) => {
  try {
    const { brand_id, model_id } = req.params;
    const { ...changes } = req.body;

    const existingBrand = await db("brands").where({ id: brand_id }).first();
    const existingModel = await db("models")
      .where({ id: model_id, brand_id })
      .first();

    if (!existingBrand) {
      throw new NotFoundError("Brand not found!");
    } else if (!existingModel) {
      throw new NotFoundError("Model not found!");
    }

    const updatedModel = await db("models")
      .update({ ...changes })
      .where({ id: model_id, brand_id })
      .returning("*");

    res.status(200).json({ updatedModel });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postModel,
  getModel,
  deleteModel,
  updateModel,
};
