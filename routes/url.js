const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const urlController = require("../controllers/urlController");

router.post("/url_generatedId", urlController.url_generatedId);

module.exports = router;
