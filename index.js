// core
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// app init
const app = express();

// config
require("./config/passport");

// middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
const todolistRoutes = require('./routes/todolistRoutes');
app.use('/api/todolist', todolistRoutes);

// auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL;

    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(`${frontendUrl}/?token=${token}`);
  }
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); 
      res.json({ message: "Logged out" });
    });
  });
});


// export app
module.exports = app;
