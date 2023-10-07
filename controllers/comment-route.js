const router = require('express').Router();
const { Comment } = require('../models');

// POST route to create a new comment
router.post('/api/comments', async (req, res) => {
  try {
    // Create a new comment with the provided comment_text and user_id
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id, // Assuming you have user session data
    });

    // Respond with the new comment data as JSON, or a success message
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


// // Update an existing comment
// // PUT http:localhost:3001/post/:id
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const updatedComment = await Comment.update(
//       { text: req.body.text },
//       {
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id, // Ensure that the comment belongs to the user
//         },
//       }
//     );

//     if (!updatedComment[0]) {
//       res.status(404).json({ message: "No comment found with this id" });
//       return;
//     }

//     res.status(200).json(updatedComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a comment
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const deletedComment = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id, // Ensure that the comment belongs to the user
//       },
//     });

//     if (!deletedComment) {
//       res.status(404).json({ message: "No comment found with this id" });
//       return;
//     }

//     res.status(200).json(deletedComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
