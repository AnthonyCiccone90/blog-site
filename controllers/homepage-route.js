const router = require('express').Router();
const { Post, User, Comment } = require('../models');


// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts along with associated user and comments
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          attributes: ['text', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['email'],
          },
        },
      ],
      order: [['created_at', 'DESC']], // Order posts by most recent
    });

    // Render the homepage view and pass in the blog post data
    res.render('homepage', {
      posts: postData.map((post) => post.get({ plain: true })),
      logged_in: req.session.logged_in, // Include whether the user is logged in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const blogPosts = await BlogPost.findAll();

    // Render the homepage with a list of blog posts
    res.render('homepage', { blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
});

module.exports = router;