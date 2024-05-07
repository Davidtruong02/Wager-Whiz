const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const sportRoutes = require('./sportRoutes');
const awsRoutes = require('./awsRoutes');

router.use('/players', playerRoutes);
router.use('/sports', sportRoutes);
router.use('/aws', awsRoutes);

module.exports = router;
