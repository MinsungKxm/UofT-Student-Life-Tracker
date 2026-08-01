import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";
import { stripTypeScriptTypes } from "module";

dotenv.config();
console.log(process.env.SESSION_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => {
    console.log("Connected to Neon PostgreSQL");
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

  
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// middleware

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Please log in."
    });
  }

  next();
}

// automatically checks if you're logged in when accessing the dashboard

app.get("/dashboard", requireLogin, (req, res) => {
  try{

  }catch(err){

  }
});

// called everytiem you try to enter the website, automatically chec ks if ur logged in

app.get("/session", (req, res) => {

  if (!req.session.user) {
    return res.json({
      loggedIn: false
    });
  }

  res.json({
    loggedIn: true,
    user: req.session.user
  });

});

// logout route, probably connect it to a button

app.post("/logout", (req, res) => {

  req.session.destroy(err => {

    if (err) {
      return res.status(500).json({
        message: "Logout failed."
      });
    }

    res.clearCookie("connect.sid");

    res.json({
      success: true
    });

  });

});

// get all events related to the user

// get all events related to the user
app.get("/events", requireLogin, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const result = await db.query(
      `
      SELECT *
      FROM events
      WHERE user_id = $1
      ORDER BY start_time
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// adding events to the database
app.post("/events", requireLogin, async (req, res) => {
  const userId = req.session.user.id;

  const {
    title,
    description,
    start_time,
    end_time,
    course,
    is_deadline
  } = req.body;

  try {
    await db.query(
      `
      INSERT INTO events
      (user_id, title, description, start_time, end_time, course, is_deadline)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      `,
      [userId, title, description, start_time, end_time, course || null, !!is_deadline]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/schedule/today", requireLogin, async (req,res)=>{

    const userId = req.session.user.id;

    const result = await db.query(
    `
    SELECT *
    FROM events
    WHERE user_id=$1
    AND DATE(start_time)=CURRENT_DATE
    ORDER BY start_time
    `,
    [userId]);

    res.json(result.rows);

});


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

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [username, hashedPassword]
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

      const match = await bcrypt.compare(password, user.password);

      if (match) {
          req.session.user = {
              id: user.id,
              email: user.email
          };

          res.json({
              success: true
          });
      }
      else {
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

