const express = require('express');
const app = express();
const todolistRoutes = require('./routes/todolistRoutes');
const cors = require('cors');
const passport = require("passport");
const session = require('express-session'); 

require("dotenv").config();
require("./config/passport");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Route Login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback dari Google
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Route Profile
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/auth/google");
  res.send(req.user); // Menampilkan data user dari Google
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const allowedOrigins = [
  'http://localhost:5173',
  'https://shoes-yale-cabinet-cardiovascular.trycloudflare.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use('/api/todolist', todolistRoutes)

module.exports = app;
