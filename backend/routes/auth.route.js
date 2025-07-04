const express = require("express"); // Changed from import
const { register, login } = require("../controllers/auth.controller.js"); // Changed from import

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router; // Changed from export default