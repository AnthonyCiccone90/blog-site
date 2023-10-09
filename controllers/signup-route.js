// routes/signup-route.js
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

const saltRounds = 10;

router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup form
});

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json({ message: 'Registration successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
