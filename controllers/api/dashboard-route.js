const router = require('express').Router();
const { Post, User } = require('../models');
const auth = require('../utils/auth');

// Dashboard route
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Fetch the user's blog posts along with associated user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id, // Filter by the logged-in user's ID
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['created_at', 'DESC']], // Order posts by most recent
    });

    // Render the dashboard view and pass in the user's blog post data
    res.render('dashboard', {
      posts: postData.map((post) => post.get({ plain: true })),
      logged_in: true, // Since this is a protected route, the user is logged in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
