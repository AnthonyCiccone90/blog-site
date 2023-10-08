const router = require("express").Router();
const { User } = require("../models");
const auth = require("../utils/helpers");

// Sign-up route
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;