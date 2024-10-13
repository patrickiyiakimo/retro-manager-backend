const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const handleLogin = async (req, res) => {
  //validate user
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user's email exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.sendStatus(401); // Unauthorized
    }

    // Check if user's password is valid
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.sendStatus(401); // Unauthorized
    }

    // Generate JWT Tokens
    const accessToken = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.REFRESH_TOKEN_SECRET, // Use separate secret for refresh token
      {
        expiresIn: "1d",
      }
    );

    return res.json({ success: `User  ${user.rows[0].username} is logged in` });
  } catch (error) {
    console.error(error.message);
    return res.sendStatus(500); // Server error
  }
};

module.exports = { handleLogin };
