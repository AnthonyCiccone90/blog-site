const router = require("express").Router();
const Comment = require("../models/Comment");

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/dashboard", async (req, res) => {
  try {
    // Fetch comments associated with the logged-in user
    const commentsData = await Comment.findAll({
      where: { user_id: req.session.user_id },
    });

    // Render the dashboard view and pass in the comments data
    res.render("dashboard", {
      comments: commentsData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/dashboard/posts/comments", async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
