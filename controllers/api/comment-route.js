const router = require('express').Router();
const { Comment } = require('../models');
const auth = require('../utils/auth');

// Create a new comment
router.post('/', auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      post_id: req.body.post_id,
      user_id: req.session.user_id, // Assuming you store the user's ID in the session
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an existing comment
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      { text: req.body.text },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // Ensure that the comment belongs to the user
        },
      }
    );

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure that the comment belongs to the user
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
