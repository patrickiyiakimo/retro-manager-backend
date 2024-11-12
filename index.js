const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2500;

// CORS configuration
app.use(cors());
app.options("*", cors());

app.use(express.json());

// Configure Sequelize connection
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl: true,
//   },
// });

// // Test the connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((err) => {
//     console.error("Error connecting to the database:", err);
//   });

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/standups", require("./routes/standups"));
app.use("/invites", require("./routes/invites"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/generateId", require("./routes/generateId"));

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// Start server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
