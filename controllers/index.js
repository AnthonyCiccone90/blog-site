const express = require('express');
const router = express.Router();

// Import individual route files
const homeRoutes = require('../controllers/homepage-route');
const dashboardRoutes = require('../controllers/dashboard-route');
const commentRoutes = require('../controllers/comment-route');
const loginRoutes = require('../controllers/login-route');
const signupRoutes = require('../controllers/signup-route');
const logoutRoutes = require('../controllers/logout-route');

// Define the routes by using the imported route files
router.use('/', homeRoutes); // Homepage route
router.use('/dashboard', dashboardRoutes); // Dashboard route
router.use('/posts', commentRoutes); // Routes for creating, updating, and deleting posts
router.use('/login', loginRoutes); // Logs in
router.use('/signup', signupRoutes);  // Creates new user
router.use('/logout', logoutRoutes); // Logs out

module.exports = router;