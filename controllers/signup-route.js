const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

const saltRounds = 10;

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Save user session data
    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    res.status(200).json({ message: 'Signed up!' });
    res.redirect('/dashboard');   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
