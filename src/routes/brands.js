const router = require("express").Router();
const {
  postBrandsSchema,
  updateBrandsSchema,
} = require("../controllers/brands/schema");
const genValidator = require("../shared/validator");
const multer = require("multer");
const { hasRole, isLoggin } = require("../middleware");
const {
  postBrands,
  getBrands,
  deleteBrands,
  updateBrands,
  getoneBrands,
} = require("../controllers/brands");

const upload = multer();

// Middleware
const mPostBrand = [
  upload.none(),
  isLoggin,
  hasRole(["admin"]),
  genValidator(postBrandsSchema),
];
const mDeleteBrand = [isLoggin, hasRole(["admin"])];
const mPatchbrand = [
  isLoggin,
  hasRole(["admin"]),
  genValidator(updateBrandsSchema),
  upload.none(),
];

// route
router.post("/brands", mPostBrand, postBrands);
router.get("/brands", getBrands);
router.delete("/brands/:id", mDeleteBrand, deleteBrands);
router.patch("/brands/:id", mPatchbrand, updateBrands);
// router.get("/brands/:id", getoneBrands);

// export
module.exports = router;
