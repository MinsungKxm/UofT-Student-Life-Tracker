import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";
import { Resend } from "resend";
import crypto from "crypto";

dotenv.config();
console.log(process.env.SESSION_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

app.set("trust proxy", 1);

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
  origin: true,
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
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: true,
      sameSite: "none"
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

app.get("/tasks", requireLogin, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const result = await db.query(
      `
      SELECT *
      FROM events
      WHERE user_id = $1
        AND is_deadline = true
      ORDER BY event_date
      LIMIT 5
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.patch("/tasks/:id/complete", requireLogin, async (req, res) => {
  const userId = req.session.user.id;
  const id = req.params.id;

  try {

    await db.query(
      `
      UPDATE events
      SET completed = true
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId]
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/tasks/:id", requireLogin, async (req, res) => {

    const userId = req.session.user.id;
    const id = req.params.id;

    try{

        await db.query(
            `
            DELETE FROM events
            WHERE id=$1
            AND user_id=$2
            `,
            [id,userId]
        );

        res.json({success:true});

    }catch(err){

        console.log(err);
        res.status(500).json({message:"Server error"});

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

  // derive event_date from start_time (YYYY-MM-DD)

  const event_date = start_time ? start_time.slice(0, 10) : null;

  try {
    await db.query(
      `
      INSERT INTO events
      (user_id, title, description, start_time, end_time, course, is_deadline, event_date, completed)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
      [userId, title, description, start_time, end_time, course || null, !!is_deadline, event_date, false]
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/events/:id", requireLogin, async (req, res) => {
  const userId = req.session.user.id;
  const eventId = req.params.id;

  try {
    await db.query(
      `
      DELETE FROM events
      WHERE id = $1
      AND user_id = $2
      `,
      [eventId, userId]
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
    if(!username.includes("@")){
    return res.status(400).json({
        message:"Invalid email"
    });
}
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

    const verificationCode =
        crypto.randomInt(100000,999999).toString();

    const expires =
        new Date(Date.now() + 10 * 60 * 1000);

    await db.query(`INSERT INTO users (email,password,email_verified,verification_code,verification_expires)
    VALUES($1,$2,false,$3,$4)
    `,
    [username, hashedPassword, verificationCode, expires]
    );

    await resend.emails.send({

        from: "Student Life Tracker <noreply@yourdomain.com>",
        to: username,
        subject: "Verify your email",
        html: `
        <h2>Student Life Tracker</h2>
        <p>Your verification code is</p>
        <h1>${verificationCode}</h1>
        <p>Expires in 10 minutes.</p>`
    });
    res.json({
      success:true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// email verification information
app.post("/verify-email", async (req,res)=>{
  try{
    const {email, code} = req.body;
    const result = await db.query(
        `SELECT *
        FROM users
        WHERE email=$1`,
        [email]
    );
    if(result.rows.length===0){
        return res.status(404).json({
            message:"User not found"
        });
    }
    const user = result.rows[0];
    if(user.verification_code !== code){
        return res.status(401).json({
            message:"Incorrect code"
        });
    }
    if(new Date() > user.verification_expires){
        return res.status(401).json({
            message:"Code expired"
        });
    }
    await db.query(
        `UPDATE users
        SET
        email_verified=true,
        verification_code=NULL,
        verification_expires=NULL
        WHERE id=$1
        `,
        [user.id]
    );
    res.json({
        success:true
    });
  }catch(err){
    console.log(err);
    res.status(500).json({
        message:"Server error"
    });
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

      if (!match) {
          return res.status(401).json({
              message:"Incorrect password"
          });
      }
      if (!user.email_verified) {
          return res.status(403).json({
              message:"Please verify your email first."
          });
      }
      req.session.user = {
          id:user.id,
          email:user.email
      };
      res.json({
          success:true
      });
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


