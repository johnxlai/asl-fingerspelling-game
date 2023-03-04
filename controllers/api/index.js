const router = require('express').Router();

const userRoutes = require('./user-routes');
const resultRoutes = require('./result-routes.js');

router.use('/users', userRoutes);
router.use('/results', resultRoutes);

module.exports = router;
