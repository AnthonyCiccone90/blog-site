const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require('bcrypt');

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Use the hashed password
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


// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
