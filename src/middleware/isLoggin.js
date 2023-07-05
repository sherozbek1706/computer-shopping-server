const jwt = require("jsonwebtoken");
const { JWT } = require("../shared/config");

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

const isLoggin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(402).json({
        error: "You have to enter token",
      });
    }

    const decoded = jwt.verify(token, JWT.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = isLoggin;