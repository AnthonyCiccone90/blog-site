const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { id, username, email, password } });

    if (!user || !user.checkPassword(password)) {
      res.status(400).json({ error: 'Incorrect email or password' });
      return;
    }

    // Save user session data
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
