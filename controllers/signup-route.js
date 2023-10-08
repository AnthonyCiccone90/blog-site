const router = require('express').Router();
const bcrypt = rquite('bcrypt');
const { User } = require('../models'); 

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

const newUser = await User.create({
  username,
  email,
  password: hashedPassword,
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email password });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json({ message: 'Signed up!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


req.session.save(() => {
  req.session.user_id = newUser.id; // Save user ID to the session
  req.session.logged_in = true; // Set the user as logged in
  res.status(200).json({ message: 'Registration successful' });
});


module.exports = router;
