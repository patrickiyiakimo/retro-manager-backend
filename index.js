// const express = require("express");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 2500;


// // const corsOptions = {
// //   origin: "http://localhost:3000",
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   allowedHeaders: ["Content-Type", "Authorization"],
// //   credentials: true,
// // };


// // app.use(cors(corsOptions));


// // app.options("*", cors(corsOptions));

// app.use(cors());
// app.options("*", cors());

// app.use(express.json());

// // Routes
// app.use("/register", require("./routes/register"));
// app.use("/login", require("./routes/login"));
// app.use("/standups", require("./routes/standups"));
// app.use("/invites", require("./routes/invites"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/generateId", require("./routes/generateId"));

// app.get("/", (req, res) => {
//   res.send("Hello from Retro Manager!");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });


// app.listen(PORT, () => {
//   console.log(`Express server running at http://localhost:${PORT}/`);
// });










const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2500;

app.use(cors());
app.options("*", cors());
app.use(express.json());

// Routes
app.use("/register", require(path.resolve(__dirname, "./routes/register")));
app.use("/login", require(path.resolve(__dirname, "./routes/login")));
app.use("/standups", require(path.resolve(__dirname, "./routes/standups")));
app.use("/invites", require(path.resolve(__dirname, "./routes/invites")));
app.use("/dashboard", require(path.resolve(__dirname, "./routes/dashboard")));
app.use("/generateId", require(path.resolve(__dirname, "./routes/generateId")));

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Export the app for Vercel
module.exports = app;
