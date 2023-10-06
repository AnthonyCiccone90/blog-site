const router = require('express').Router();

// Import individual route files
const homeRoutes = require('../controllers/homepage-route');
const dashboardRoutes = require('../controllers/dashboard-route');
const commentRoutes = require('../controllers/comment-route');
const userRoutes = require('../controllers/user-routes');
const loginRoutes = require('../controllers/login-route');

// Define the routes by using the imported route files
router.use('/', homeRoutes); // Homepage route
router.use('/dashboard', dashboardRoutes); // Dashboard route and related routes
router.use('/posts', commentRoutes); // Routes for creating, updating, and deleting posts
router.use('/users', userRoutes); // Sign-up, login, logout routes
http://localhost:3001/login/
router.use('/login', loginRoutes);

module.exports = router
