const router = require("express").Router();


router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});




// controllers/dashboard-route.js

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch comments associated with the logged-in user
    const commentsData = await Comment.findAll({
      where: { user_id: req.session.user_id },
      // Include any necessary associations, e.g., User
    });

    // Render the dashboard view and pass in the comments data
    res.render('dashboard', {
      comments: commentsData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});







module.exports = router;
