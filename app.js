require("dotenv").config();
const db = require("./config/db");

const index = require("./index");

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

const server = async () => {
  try {
    await db();
   app.listen(process.env.PORT, () => {
     console.log(`Express server running at http://localhost:${PORT}/`);
   });
  } catch (error) {
    console.error(error.message);
  }
};

server();
