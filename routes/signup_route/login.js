const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const loginController = require("../controllers/loginController");

router.post("/", loginController.handleLogin);

module.exports = router;
