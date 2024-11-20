require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool;








// require("dotenv").config();
// const { Pool } = require("pg");

// // Configure the database connection
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL, // Use the connection string from the .env file
//   ssl: {
//     rejectUnauthorized: false, // Required for Neon and most hosted PostgreSQL databases
//   },
// });

// // Test the database connection
// pool
//   .connect()
//   .then(() => console.log("Connected to the database successfully"))
//   .catch((err) => {
//     console.error("Database connection error:", err);
//     process.exit(1); // Exit the application if the database connection fails
//   });

// module.exports = pool;
