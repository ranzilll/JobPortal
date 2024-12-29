import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();  // Only call dotenv.config() once

const app = express();
const port = 5000;  // You can change the port if needed

console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_NAME);
// Create a MySQL connection pool using credentials from the .env file
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);  // Exit the application if the database connection fails
  } else {
    console.log('Database connected successfully');
  }
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample route to check if the server is running
app.get('/', (req, res) => {
  res.send('Job Portal API is running');
});

// Route to get all job listings
app.get('/api/jobs', (req, res) => {
  const query = 'SELECT * FROM job_listings'; // Query to get all job listings
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching job listings:', err);
      return res.status(500).json({ error: 'Error fetching job listings' });
    }
    res.json(results); // Send the job listings as the response
  });
});

// Route to add a new job listing
app.post('/api/jobs', (req, res) => {
  const { jobTitle, description, location, salary, contactEmail } = req.body;

  // Validate the data
  if (!jobTitle || !description || !location || !salary || !contactEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Query to insert the new job listing into the database
  const query = 'INSERT INTO job_listings (jobTitle, description, location, salary, contactEmail) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [jobTitle, description, location, salary, contactEmail], (err, results) => {
    if (err) {
      console.error('Error adding job listing:', err);
      return res.status(500).json({ error: 'Error adding job listing' });
    }
    res.status(201).json({ message: 'Job listing added successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



