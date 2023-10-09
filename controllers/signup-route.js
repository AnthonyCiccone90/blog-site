const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');


router.get('/', (req, res) => {
  res.render('signup');
});

// Sign-up route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // If email or password is missing, send a 400 Bad Request response
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    console.log('User registered successfully');

    res.status(200).json({ message: 'Signed up!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
