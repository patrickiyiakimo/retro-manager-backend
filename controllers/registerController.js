const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { sendMail } = require("./mailSend");
require("dotenv").config();

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username and email and password are required" });
  }
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (user.rows.length > 0) {
    return res.sendStatus(409); //conflict.
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // Send a welcome email to the new user
    const subject = "Welcome to Retro Manager";
    const message = `Dear ${username},<br><br>Thank you for signing up to our platform! We're excited to have you on board. Retro Manager is designed to help your team collaborate effectively and drive continuous improvement through agile retrospectives.<br><br>Best regards,  [RM]`;
    sendMail(email, subject, message);

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); //server error
  }
};

module.exports = { handleNewUser };
