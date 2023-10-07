// const { User } = require('../models');

// // Middleware for authentication
// const authMiddleware = async (req, res, next) => {
//   try {
//     // Check if the user is logged in
//     if (!req.session.user_id) {
//       return res.redirect('/login'); // Redirect to the login page if not logged in
//     }

//     // Fetch the user's data based on the session user_id
//     const userData = await User.findByPk(req.session.user_id);

//     if (!userData) {
//       return res.redirect('/login'); // Redirect to the login page if the user doesn't exist
//     }

//     // Attach the user's data to the request object
//     req.user = userData;

//     next(); // Continue to the next middleware or route handler
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Authentication error' });
//   }
// };

// module.exports = authMiddleware;
