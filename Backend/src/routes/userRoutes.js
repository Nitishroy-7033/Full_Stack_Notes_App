const express = require('express');
const { createUser, getAllUsers, getUserById, getUserByEmail } = require('../controllers/usersController');

const router = express.Router();


router.post("/",createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:emailId", getUserByEmail);



module.exports = router;