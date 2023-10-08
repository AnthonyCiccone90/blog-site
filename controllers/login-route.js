const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

// Display the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user || !user.checkPassword(password)) {
      res.status(400).json({ error: 'Incorrect email or password' });
      return;
    }
    // Store user session data
    req.session.user_id = user.id;
    req.session.logged_in = true;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
