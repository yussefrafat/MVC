const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes')

//connect api routes
router.use('/comments', commentRoutes)
router.use('/posts', postRoutes)
router.use('/users', userRoutes);


module.exports = router;