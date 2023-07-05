const router = require("express").Router();
const { categorySchema } = require("../controllers/category/schema");
const genValidator = require("../shared/validator");
const multer = require("multer");
const { hasRole, isLoggin } = require("../middleware");
const {
  postCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

const upload = multer();

// Middleware
const mPostCategory = [
  upload.none(),
  isLoggin,
  hasRole(["admin"]),
  genValidator(categorySchema),
];
const mDeleteCategory = [isLoggin, hasRole(["admin"])];
const mPatchCategory = [
  isLoggin,
  hasRole(["admin"]),
  upload.none(),
  genValidator(categorySchema),
];

// route
router.post("/category", mPostCategory, postCategory);
router.get("/category", getCategory);
router.delete("/category/:id", mDeleteCategory, deleteCategory);
router.patch("/category/:id", mPatchCategory, updateCategory);
// router.get("/brands/:id", getoneBrands);

// export
module.exports = router;
