import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const db = new pg.Client({
  user: process.env.USER,
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));


app.post("/register", async (req, res) => {

  const username = req.body.email;
  const password = req.body.password;

  try {
    const record = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [username]
    );

    if (record.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists."
      });
    }

    await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [username, password]
    );

    res.redirect("http://localhost:5173/");

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (password === user.password) {
        res.redirect("http://localhost:5173/dashboard");

      } else {
        res.status(401).json({
          message: "Incorrect password"
        });
      }

    } else {
      res.status(404).json({
        message: "User not found"
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

