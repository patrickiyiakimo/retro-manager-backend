require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const PORT = process.env.PORT || 10000;

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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

//middleware
app.use(express.json());

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/standups", require("./routes/standups"));
app.use("/invites", require("./routes/invites"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/generateId", require("./routes/generateId"));
app.use("/url", require("./routes/url"))

app.use(bodyParser.json({ limit: "50Mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
