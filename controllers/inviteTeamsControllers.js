const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const dashboardId = "0";
const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create an invitation
const invite_team = async (req, res) => {
  const { invitedEmail } = req.body;
  const uuid = req.body.uuid;

  // Input validation
  if (!invitedEmail || !uuid) return res.status(400).json({ message: "All fields are required." });

  // Send an email invite to the invited user
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitedEmail,
    subject: "You have been invited!",
    text: `You have been invited. Please click on the following link to accept the invitation: http://your-app-url.com/accept-invitation/${uuid}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email Sent:", "Email sent successfully ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error sending email" });
  }

  try {
    await pool.query("BEGIN");

    await pool.query("INSERT INTO inviteteams (invited_email, uuid) VALUES ($1, $2)", [
      invitedEmail,
      uuid,
    ]);

    await pool.query(
      "UPDATE dashboard SET participants_count = participants_count + 1 WHERE dashboard_id = $1",
      [dashboardId]
    );

    await pool.query("COMMIT");

    res.status(201).json({ message: "Invitation sent successfully" });
  } catch (error) {
    try {
      await pool.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback error:", rollbackError);
    }

    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Error sending invitation" });
  }
};

const get_invitations = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    const invitations = await pool.query("SELECT * FROM inviteteams WHERE uuid = $1", [uuid]);

    const formattedInvitations = invitations.rows.map((invitation) => {
      const invitedAt = new Date(invitation.invited_at);
      const now = new Date();
      let dateMessage;

      // Checking if the invitation was made today or yesterday
      if (invitedAt.toDateString() === now.toDateString()) {
        dateMessage = "Today";
      } else if (
        invitedAt.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()
      ) {
        dateMessage = "Yesterday";
      } else {
        dateMessage = invitedAt.toLocaleDateString();
      }

      return {
        ...invitation,
        dateMessage,
      };
    });

    res.json(formattedInvitations);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); 
  }
};

// Accept an invitation
const accept_invitation = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    await pool.query("UPDATE inviteteams SET status = 'accepted' WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation accepted successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); 
  }
};

// Decline an invitation
const decline_invitation = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    await pool.query("UPDATE inviteteams SET status = 'declined' WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation declined successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

// Delete an invitation
const delete_invitation = async (req, res) => {
  try {
    const { uuid } = req.body;

    await pool.query("DELETE FROM inviteteams WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

module.exports = {
  invite_team,
  get_invitations,
  accept_invitation,
  decline_invitation,
  delete_invitation,
};
