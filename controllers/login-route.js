const router = require("express").Router();
// http://localhost:3001/login/public/login
router.get("/public/login", (req, res) => {
  res.render("login");
});

module.exports = router;