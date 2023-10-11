const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const flash = require("express-flash");

router.use(flash());

router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("message") });
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.flash("message", "Login successful");
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;