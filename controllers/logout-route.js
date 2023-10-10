const express = require('express');
const router = express.Router();

router.post('/logout', async (req, res) => {
  try {
    // Clear user session data
    req.session.destroy(() => {
      res.redirect('/')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;