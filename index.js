// const express = require("express");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");
// const { Sequelize } = require("sequelize");
// const bodyParser = require("body-parser")
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 2500;

// // CORS configuration
// app.use(cors());
// app.options("*", cors());

// app.use(express.json());

// // Configure Sequelize connection
// // const sequelize = new Sequelize(process.env.DATABASE_URL, {
// //   dialect: "postgres",
// //   protocol: "postgres",
// //   logging: false,
// //   dialectOptions: {
// //     ssl: true,
// //   },
// // });

// // // Test the connection
// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log("Database connected successfully");
// //   })
// //   .catch((err) => {
// //     console.error("Error connecting to the database:", err);
// //   });

// // Routes
// app.use("/register", require("./routes/register"));
// app.use("/login", require("./routes/login"));
// app.use("/standups", require("./routes/standups"));
// app.use("/invites", require("./routes/invites"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/generateId", require("./routes/generateId"));

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello from Retro Manager!");
// });

// app.use(bodyParser.json({ limit: "50Mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));

// // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).send("Something broke!");
// // });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Express server running at http://localhost:${PORT}/`);
// });



// const express = require("express");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");
// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 2500;

// // CORS configuration
// app.use(cors());
// app.options("*", cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// require("dotenv").config();

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// // Construct the database connection string
// const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;


// // Debugging: Log the constructed URL (avoid logging sensitive data in production)
// console.log("Database URL:", databaseUrl);

// // // Sequelize Database Connection
// // const sequelize = new Sequelize(process.env.DATABASE_URL, {
// //   dialect: "postgres",
// //   protocol: "postgres",
// //   logging: false,
// //   dialectOptions: {
// //      ssl: true,
// //    },
// // });

// // // Test the connection
// // sequelize
// //   .authenticate()
// //   .then(() => console.log("Database connected successfully"))
// //   .catch((err) => console.error("Error connecting to the database:", err));

// const sequelize = new Sequelize(databaseUrl, {
//   dialect: "postgres",
//   protocol: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl:
//       process.env.NODE_ENV === "production" ? { require: true, rejectUnauthorized: false } : false,
//   },
// });

// // Test connection
// sequelize
//   .authenticate()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Error connecting to the database:", err));

// // Routes
// app.use("/register", require("./routes/register"));
// app.use("/login", require("./routes/login"));
// app.use("/standups", require("./routes/standups"));
// app.use("/invites", require("./routes/invites"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/generateId", require("./routes/generateId"));

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello from Retro Manager!");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: true,
//     message: err.message || "Internal Server Error",
//   });
// });

// // Export the app for serverless deployment
// module.exports = app;








const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2500;

// CORS configuration
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetch environment variables
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, NODE_ENV } = process.env;

// // Construct the database connection string securely
// const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// // Sequelize Database Connection
// const sequelize = new Sequelize(databaseUrl, {
//   dialect: "postgres",
//   protocol: "postgres",
//   logging: NODE_ENV === "production" ? false : console.log, // Disable logging in production
//   dialectOptions: {
//     ssl: NODE_ENV === "production" ? { require: true, rejectUnauthorized: false } : false,
//   },
// });


// // Test connection
// sequelize
//   .authenticate()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Error connecting to the database:", err));



// // Routes
// app.use("/register", require("./routes/register"));
// app.use("/login", require("./routes/login"));
// app.use("/standups", require("./routes/standups"));
// app.use("/invites", require("./routes/invites"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/generateId", require("./routes/generateId"));

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello from Retro Manager!");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: true,
//     message: err.message || "Internal Server Error",
//   });
// });

// // Export the app for serverless deployment
// module.exports = app;





const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production" ? { require: true, rejectUnauthorized: false } : false,
  },
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate(); // Make sure this is inside an async function
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Call the async function to connect to the database
connectDatabase();