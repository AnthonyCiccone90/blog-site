const express = require('express');
const router = express.Router();
const flash = require('express-flash');

// Middleware to set up flash messages
router.use(flash());

router.get('/logout', (req, res) => {
  console.log('Logout route reached');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/login');
  });
});

router.post('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      req.flash('success', 'Logged out');
      res.redirect('/login');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
