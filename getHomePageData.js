// A MODULE TO RETRIEVE HOME PAGE DATA FROM POSTGRESQL SERVER
// ==========================================================

// LIBRARIES AND MODULES
// ---------------------

// The pg-pool library for PostgreSQL Server
const Pool = require('pg').Pool;

// DATABASE SETTINGS
// ------------

// Create a new pool for Postgres connections
const pool = new Pool({
  user: 'smart_home', // In production always create a new user for the app
  password: 'smart_home',
  host: 'localhost', // Or localhost or 127.0.0.1 if in the same computer
  database: 'smart_home',
  port: 5432
});

// Function for running SQL operations asyncronously
const getCurrentPrice = async () => {
  let resultset = await pool.query('SELECT hinta FROM public.current_prices');
  return resultset;
}

module.exports = { getCurrentPrice }    