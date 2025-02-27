const pool = require("../../config/db");
require("dotenv").config();

const getAllDashboard = async (req, res) => {
  try {
    const allDashboard = await pool.query("SELECT * FROM dashboard");

    res.json(allDashboard.rows);
  } catch (error) {
    console.error("Error fetching dashboards:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const { team_name, creator_id, participants_count } = req.body;

    const result = await pool.query(
      "INSERT INTO dashboard (team_name, creator_id, participants_count) VALUES ($1, $2, $3) RETURNING *",
      [team_name, creator_id, participants_count]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
};

const delete_dashboard = async (req, res) => {
  try {
    const { dashboard_id } = req.params;

    const del = await pool.query("DELETE FROM dashboard WHERE dashboard_id = $1", [dashboard_id]);

    // checking if any rows were affected
    if (del.rowCount === 0) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.json("Dashboard deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
};

module.exports = {
  getAllDashboard,
  dashboard,
  delete_dashboard,
};
