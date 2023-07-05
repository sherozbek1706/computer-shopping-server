const db = require("../../db");
const bcrypt = require("bcrypt");
const { JWT } = require("../../shared/config");
const jwt = require("jsonwebtoken");
const { BadRequestError, NotFoundError } = require("../../shared/errors");

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

/**
 *
 * REGISTER USER
 */

const registerUsers = async (req, res, next) => {
  try {
    const { username, password, ...data } = req.body;
    const { filename } = req.file;

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new User

    const newUser = {
      ...data,
      username,
      password: hashedPassword,
      image: filename,
      role: "user",
    };

    // existed User

    const existedUser = await db("users")
      .where({
        username,
      })
      .first();

    if (existedUser) {
      throw new BadRequestError("This user already exist!");
    }

    // created User

    const user = await db("users").insert(newUser).returning("*");

    res.status(201).json({ user: user });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Login User
 */

const loginUsers = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // existed User

    const existedUser = await db("users")
      .where({
        username,
      })
      .first();

    if (!existedUser) {
      throw new NotFoundError("User not found!");
    }

    // COMPARE PASSWORD

    const match = await bcrypt.compare(password, existedUser.password);

    if (!match) {
      throw new BadRequestError("Username or password invalid!");
    }

    // JWT DATA

    const jwtData = {
      id: existedUser.id,
      role: existedUser.role,
    };

    // CREATE TOKEN
    const token = jwt.sign(jwtData, JWT.JWT_SECRET, { expiresIn: 60 * 60 });

    res.json({
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * GET USERS
 */

const getUsers = async (req, res, next) => {
  try {
    const users = await db("users");

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * DELETE USERS
 */

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: admin_id } = req.user;

    // Not Allowed Delete
    if (id == admin_id) {
      throw new BadRequestError("Not allowed!");
    }

    // Existed User
    const existedUser = await db("users").where({ id }).first();

    if (!existedUser) {
      throw new NotFoundError("User not found!");
    }

    await db("users").where({ id }).delete();

    res.status(200).json({ deletedUser: existedUser });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * SET ADMIN
 */

const setAdminUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: admin_id } = req.user;
    const { role } = req.body;

    // Not Allowed Delete
    if (id == admin_id) {
      throw new BadRequestError("Not allowed!");
    }

    // Existed User
    const existedUser = await db("users").where({ id }).first();

    if (!existedUser) {
      throw new NotFoundError("User not found!");
    }

    const { role: old_role, ...changes } = existedUser;

    const updatedUser = await db("users")
      .update({
        role,
        ...changes,
      })
      .where({ id })
      .returning("*");

    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUsers,
  loginUsers,
  getUsers,
  deleteUsers,
  setAdminUsers,
};
