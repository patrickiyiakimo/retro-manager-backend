const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const generateTeamIdController = require("../controllers/generateTeamIdController")


router.post("/generate_uuid", generateTeamIdController.generate_uuid)

module.exports = router