const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const standupsControllers = require("../controllers/standupsControllers");

router.post("/", standupsControllers.newStandups);
router.get("/", standupsControllers.standups);
router.get("/:standup_id", standupsControllers.getStandup);
router.put("/:standup_id", standupsControllers.updateStandup);
router.delete("/:standup_id", standupsControllers.deleteStandup);

module.exports = router;
