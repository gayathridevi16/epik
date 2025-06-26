// FILE: backend/index.js (ES Module Version)

import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
    
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',    
  database: 'epik_task',
  password: '2323',
  port: 8888,
});

// Route
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.std_id, 
        s.std_name, 
        s.std_address, 
        s.std_class, 
        p.pd_name AS parent_name
      FROM student_details s
      JOIN student_parent_details p ON s.std_id = p.pd_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error - query failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
