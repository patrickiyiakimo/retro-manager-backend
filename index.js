require("dotenv").config();
const db = require("./config/db");

const app = require("./app");

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

app.get("*", (req, res) => {
  res.send("Resources not Found");
});
