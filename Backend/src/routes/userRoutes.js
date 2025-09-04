const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  loginUser,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:emailId", getUserByEmail);
router.post("/login", loginUser);

module.exports = router;
