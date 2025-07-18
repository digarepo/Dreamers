import { createPool, Pool } from "mysql2/promise";

// Vite-compatible environment variable access
const DB_HOST = import.meta.env.VITE_DB_HOST || "localhost";
const DB_PORT = import.meta.env.VITE_DB_PORT
  ? parseInt(import.meta.env.VITE_DB_PORT)
  : 3309;
const DB_USER = import.meta.env.VITE_DB_USER || "root";
const DB_PASSWORD = import.meta.env.VITE_DB_PASSWORD || "Tinsae";
const DB_NAME = import.meta.env.VITE_DB_NAME || "dreamers_db";

const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
};

// Create connection pool
const pool: Pool = createPool(dbConfig);

// Initialize database tables
async function initializeTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shareholders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        shares INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Shareholders table initialized");
  } catch (error) {
    console.error("Table initialization failed:", error);
    throw error;
  }
}

// Initialize on startup
initializeTables();

// Query functions
export async function query(sql: string, values?: any[]) {
  const [rows] = await pool.query(sql, values);
  return rows;
}

export async function execute(sql: string, values?: any[]) {
  const [result] = await pool.execute(sql, values);
  return result;
}

// Connection test function
export async function testConnection() {
  try {
    const [result] = await pool.query("SELECT 'Database Connected' AS status");
    return result;
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
}
