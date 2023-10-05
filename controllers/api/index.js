const router = require('express').Router();

// Import individual route files
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

// Define the routes by using the imported route files
router.use('/', homeRoutes); // Homepage route
router.use('/dashboard', dashboardRoutes); // Dashboard route and related routes
router.use('/posts', postRoutes); // Routes for creating, updating, and deleting posts
router.use('/comments', commentRoutes); // Routes for creating, updating, and deleting comments
router.use('/users', userRoutes); // Sign-up, login, logout routes

module.exports = router;
