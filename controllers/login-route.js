const router = require("express").Router();
// http://localhost:3001/login/public/login
router.get("/public/login", (req, res) => {
  res.render("login");
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to the home page after logout
  });
});

module.exports = router;