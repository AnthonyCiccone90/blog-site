const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  res.render('dashboard', { logoutSuccessful: true });
});

router.post('/logout', async (req, res) => {
  try {
    // Clear user session data
    req.session.destroy(() => {
      res.locals.logoutSuccessful = true;
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;