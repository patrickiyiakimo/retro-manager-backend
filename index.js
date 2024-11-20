require("dotenv").config();
const db = require("./config/db");
// const PORT = process.env.PORT || 2500;

const app = require("./app");

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

const server = async () => {
  try {
    await db();
   app.listen(2500, () => {
     console.log(`Express server running at port 2500`);
   });
  } catch (error) {
    console.error(error.message);
  }
};

server();
