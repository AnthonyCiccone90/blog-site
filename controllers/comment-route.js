const router = require('express').Router();
const { Comment } = require('../models');
const auth = require('../utils/helpers').isAuthenticated;
const { isAuthenticated } = require('../utils/helpers');



router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update an existing comment
router.put("/:id", auth, async (req, res) => {
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
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure that the comment belongs to the user
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;