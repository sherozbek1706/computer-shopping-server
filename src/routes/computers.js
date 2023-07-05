const router = require("express").Router();
const {
  hasRole,
  isLoggin,
  uploadComputer,
  uploadUsers,
} = require("../middleware");
const {
  postComputers,
  getComputers,
  deleteComputers,
  updateComputers,
  getoneComputer,
} = require("../controllers/computers");
//
// Middleware
const mPostComputers = [isLoggin, hasRole(["admin"]), uploadUsers];
const mDeleteComputers = [isLoggin, hasRole(["admin"])];
const mUpdateComputers = [isLoggin, hasRole(["admin"]), uploadComputer];

// router
router.post("/computers", mPostComputers, postComputers);
router.get("/computers", getComputers);
router.delete("/computers/:id", mDeleteComputers, deleteComputers);
router.patch("/computers/:id", mUpdateComputers, updateComputers);
router.get("/computers/:id", getoneComputer);

// exports
module.exports = router;
