// Backend - Express.js Server with PostgreSQL
import express from "express";
import pg from "pg";
import shortid from "shortid";
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Connect to PostgreSQL
const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
db.connect();

// Create table if not exists
// db.query(`
//   CREATE TABLE IF NOT EXISTS urls (
//     id SERIAL PRIMARY KEY,
//     short_url TEXT UNIQUE,
//     long_url TEXT NOT NULL
//   );
// `);

// API to shorten a URL
app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    await db.query("INSERT INTO urls (short_url, long_url) VALUES ($1, $2)", [shortUrl, longUrl]);
    console.log("Inserted URL:", { shortUrl, longUrl });

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error inserting URL", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API to redirect short URL to long URL
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const result = await db.query("SELECT long_url FROM urls WHERE short_url = $1", [shortUrl]);
    if (result.rows.length > 0) {
      res.redirect(result.rows[0].long_url);
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error("Error fetching URL", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));