const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
require("dotenv").config();
const Pool = require("pg").Pool;
const PORT = process.env.PORT || 2500;

const app = express();

// CORS configuration
app.use(cors());
app.options("*", cors());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

//middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "50Mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true,
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/standups", require("./routes/standups"));
app.use("/invites", require("./routes/invites"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/generateId", require("./routes/generateId"));

// Root route
// app.get("/", (req, res) => {
//   res.send("Hello from Retro Manager!");
// });

app.use(bodyParser.json({ limit: "50Mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
