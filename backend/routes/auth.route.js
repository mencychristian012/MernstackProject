const express = require("express"); // Changed from import
const { register, login } = require("../controllers/auth.controller.js"); // Changed from import
const { validateRegister, validateLogin } = require("../validators/authValidators.js");

const router = express.Router();

router.post("/register",validateRegister, register);
router.post("/login",validateLogin, login);

module.exports = router; // Changed from export default