const db = require("../../db");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

const postComputers = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const { filename } = req.file;

    const computer = await db("computers")
      .insert({ ...data, image: filename })
      .returning("*");

    res.status(201).json({ computer });
  } catch (error) {
    next(error);
  }
};

const getComputers = async (req, res, next) => {
  try {
    const { sort, q, low = 0, high = Date.now() * 150 } = req.query;

    const computersQuery = db("computers")
      .leftJoin("brands", "brands.id", "computers.brand_id")
      .leftJoin("categories", "categories.id", "computers.category_id")
      .leftJoin("models", "models.id", "computers.model_id")
      .select(
        "computers.id",
        "computers.name",
        "computers.price",
        "computers.image",
        "brands.name as brand_name"
      );

    if (sort == "asc" || sort == "desc") {
      computersQuery.orderBy("name", sort);
    }

    if (q) {
      computersQuery.orWhereILike("computers.name", `%${q}%`);
    }

    if (high || low) {
      computersQuery
        .andWhere("computers.price", ">", low)
        .andWhere("computers.price", "<", high);
    }

    const computers = await computersQuery;

    res.status(200).json({ computers });
  } catch (error) {
    next(error);
  }
};

const deleteComputers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existedComputer = await db("computers").where({ id }).first();

    if (!existedComputer) {
      throw new NotFoundError("Computer not found!");
    }

    await db("computers").where({ id }).delete();

    res.status(200).json({ deletedComputer: existedComputer });
  } catch (error) {
    next(error);
  }
};
const updateComputers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, ...changes } = req.body;
    // const { filename } = req.file;

    const existedComputer = await db("computers").where({ id }).first();

    if (!existedComputer) {
      throw new NotFoundError("Computer not found!");
    }

    const updatedComputer = await db("computers")
      .update({ ...changes, image: req.file ? req.file.filename : image })
      .where({ id })
      .returning("*");

    res.status(200).json({ updatedComputer });
  } catch (error) {
    next(error);
  }
};

const getoneComputer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existedComputer = await db("computers").where({ id }).first();

    if (!existedComputer) {
      throw new NotFoundError("Computer not found!");
    }

    const computer = await db("computers")
      .leftJoin("brands", "brands.id", "computers.brand_id")
      .leftJoin("categories", "categories.id", "computers.category_id")
      .leftJoin("models", "models.id", "computers.model_id")
      .select(
        "computers.id",
        "computers.name",
        "computers.price",
        "computers.year",
        "computers.image",
        "brands.name as brand_name",
        "categories.name as category_name",
        "models.name as model_name"
      )
      .where({ "computers.id": id });

    console.log(computer);

    res.status(200).json({ computelarmir: computer });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postComputers,
  getComputers,
  deleteComputers,
  updateComputers,
  getoneComputer,
};
