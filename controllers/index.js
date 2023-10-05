const router = require('express').Router();

// Import individual route files
const homeRoutes = require('../controllers/homepage-route');
const dashboardRoutes = require('../controllers/dashboard-route');
const commentRoutes = require('../controllers/comment-route');
const userRoutes = require('../controllers/user-routes');

// Define the routes by using the imported route files
router.use('/', homeRoutes); // Homepage route
router.use('/dashboard', dashboardRoutes); // Dashboard route and related routes
router.use('/posts', commentRoutes); // Routes for creating, updating, and deleting posts
router.use('/users', userRoutes); // Sign-up, login, logout routes

module.exports = router;
