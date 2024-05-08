const router = require("express").Router();
const playerRoutes = require("./playerRoutes");
const sportRoutes = require("./sportRoutes");
const awsRoutes = require("./awsRoutes");
const teamRoutes = require("./teamRoutes");

router.use("/players", playerRoutes);
router.use("/sports", sportRoutes);
router.use("/aws", awsRoutes);
router.use("/team", teamRoutes);

module.exports = router;
