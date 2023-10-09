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
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user in the database
    const newUser = await User.create({
      username: username,
      email: email,
      password: password
    });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    res.status(200).json({ message: 'Signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
  if (response.ok) {
    alert('User registered successfully');
    res.redirect('/dashboard'); // Redirect to the dashboard page
  } else {
    alert('Failed to sign up.');
  }
  
});

module.exports = router;