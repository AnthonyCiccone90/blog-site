const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Display an individual blog post and comments
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: Comment, // Include comments associated with the post
    });

    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const postId = req.params.id;
    const { text, username } = req.body;
    const comment = await Comment.create({ text, username, postId });

    // Redirect to the post page after adding a comment
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
