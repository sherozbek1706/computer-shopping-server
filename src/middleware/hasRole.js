const hasRole = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    next();
  };
};

module.exports = hasRole;
