const router = require('express').Router();

// enter const userRoutes = require('./user-routes.js'); as example for each routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-record-routes');
const interestRoutes = require('./interest-routes');

// enter router.use('/users', userRoutes); as example for each route
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/interests', interestRoutes);

module.exports = router;