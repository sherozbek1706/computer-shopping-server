const router = require("express").Router();
const { hasRole, isLoggin, uploadUsers } = require("../middleware");
const {
  getUsers,
  deleteUsers,
  setAdminUsers,
} = require("../controllers/users");

// Middleware
const mGetUsers = [isLoggin, hasRole(["admin"])];
const mDeleteUser = [isLoggin, hasRole(["admin"])];
const mSetAdminUser = [isLoggin, uploadUsers, hasRole(["admin"])];
// Router
router.get("/users", mGetUsers, getUsers);
router.delete("/users/:id", mDeleteUser, deleteUsers);
router.patch("/users/setadmin/:id", mSetAdminUser, setAdminUsers);

// Exports
module.exports = router;
