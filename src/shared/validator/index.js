/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

module.exports = function genValidator(schema) {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
};
