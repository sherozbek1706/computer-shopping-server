const router = require("express").Router();
const { modelSchema } = require("../controllers/modells/schema");
const genValidator = require("../shared/validator");
const multer = require("multer");
const { hasRole, isLoggin } = require("../middleware");
const {
  postModel,
  getModel,
  deleteModel,
  updateModel,
} = require("../controllers/modells");

const upload = multer();

// Middleware
const mPostModel = [
  upload.none(),
  isLoggin,
  hasRole(["admin"]),
  genValidator(modelSchema),
];
const mDeleteBrand = [isLoggin, hasRole(["admin"])];
const mPatchModel = [
  upload.none(),
  isLoggin,
  hasRole(["admin"]),
  genValidator(modelSchema),
];

// route
router.post("/brands/:brand_id", mPostModel, postModel);
router.get("/brands/:brand_id", getModel);
router.delete("/brands/:brand_id/:model_id", mDeleteBrand, deleteModel);
router.patch("/brands/:brand_id/:model_id", mPatchModel, updateModel);

// export
module.exports = router;
