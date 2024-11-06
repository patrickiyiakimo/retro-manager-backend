const pool = require("../config/db");
require("dotenv").config();

// Post a standup
async function newStandups(req, res) {
  try {
    const { accomplished, not_well, working_on, improvement } = req.body;
    const newStandup = await pool.query(
      "INSERT INTO standups (accomplished, not_well, working_on, improvement) VALUES($1, $2, $3, $4) RETURNING *",
      [accomplished, not_well, working_on, improvement]
    );
    res.json(newStandup.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); 
  }
}

// Get all standups
async function standups(req, res) {
  try {
    const standups = await pool.query("SELECT * FROM standups");
    res.json(standups.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); 
  }
}

// Get a standup
async function getStandup(req, res) {
  try {
    const { standup_id } = req.params;
    const standup = await pool.query("SELECT * FROM standups WHERE standup_id = $1", [standup_id]);
    res.json(standup.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); // Bad request
  }
}

// Update a standup
async function updateStandup(req, res) {
  try {
    const { standup_id } = req.params;
    const { accomplished, not_well, working_on, improvement } = req.body;
    await pool.query(
      "UPDATE standups SET accomplished = $1, not_well = $2, working_on = $3, improvement = $4 WHERE standup_id = $5",
      [accomplished, not_well, working_on, improvement, standup_id]
    );
    res.json("Standup was updated");
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); // Bad request
  }
}

// Delete a standup
async function deleteStandup(req, res) {
  try {
    const { standup_id } = req.params;
    await pool.query("DELETE FROM standups WHERE standup_id = $1", [standup_id]);
    res.json("Standup was deleted");
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); // Bad request
  }
}

module.exports = {
  newStandups,
  standups,
  getStandup,
  updateStandup,
  deleteStandup,
};
