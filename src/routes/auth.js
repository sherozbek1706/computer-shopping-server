const router = require("express").Router();
const genValidator = require("../shared/validator");
const { uploadUsers } = require("../middleware");
const { registerUsers, loginUsers } = require("../controllers/users");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../controllers/users/schema");

// Middleware
const mRegister = [uploadUsers, genValidator(registerUserSchema)];
const mLogin = [uploadUsers, genValidator(loginUserSchema)];

//route
router.post("/register", mRegister, registerUsers);
router.post("/login", mLogin, loginUsers);

module.exports = router;
