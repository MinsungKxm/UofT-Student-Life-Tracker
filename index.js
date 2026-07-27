import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const db = new pg.Client({
  user: USERNAME,
  host: "localhost",
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

db.connect();

let users = [];

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/login", async(req, res) => {
  res.sendFile(path.join(__dirname, "dist", "Login.jsx"));
})

app.listen(3000, () => {
  console.log("Server running");
});




app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try{
    let record = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if(record.rows.length > 0){
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [username, password]);
      res.render("secrets.ejs");
    }else{
      console.log("User is already registered. Please log in.");
      res.redirect("/");
    }
  }catch(err){
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
