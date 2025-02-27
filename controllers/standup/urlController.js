const express = require("express")
const router = express.Router();
const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

const url_generatedId = async (req, res) => {
  console.log("Received request to generate UUID");
  try {
    // Generate a new UUID
    const newUuid = uuidv4();

    // Insert UUID into the database
    const result = await pool.query("INSERT INTO retrospectives (uuid) VALUES ($1) RETURNING *", [
      newUuid,
    ]);

    // Construct the retrospective URL
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const fullUrl = `${baseUrl}/retrospective/${result.rows[0].uuid}`;

    // Return the full URL
    res.status(201).json({ uuid: result.rows[0].uuid, url: fullUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to generate UUID" });
  }
};

module.exports = { url_generatedId };
