const express = require("express");
const router = express.Router();
const inviteTeamsControllers = require("../controllers/inviteTeamsControllers");

router.post("/", inviteTeamsControllers.invite_team);
router.get("/", inviteTeamsControllers.get_invitations);
router.put("/accept", inviteTeamsControllers.accept_invitation);
router.put("/decline", inviteTeamsControllers.decline_invitation);
router.delete("/", inviteTeamsControllers.delete_invitation);

module.exports = router;
