const router = require("express").Router();
const playerRoutes = require("./playerRoutes");
const playerRoutesNBA = require("./playerRoutesNBA");
const playerRoutesMLB = require("./playerRoutesMLB");
const sportRoutes = require("./sportRoutes");
const awsRoutes = require("./awsRoutes");
const teamRoutes = require("./teamRoutes");
const myPicksRoutes = require("./myPicksRoutes");

router.use("/players", playerRoutes);
router.use("/sports", sportRoutes);
router.use("/aws", awsRoutes);
router.use("/team", teamRoutes);
router.use("/mypicks", myPicksRoutes);
router.use("/playerRoutesMLB", playerRoutesMLB);
router.use("/playerRoutesNBA", playerRoutesNBA);

module.exports = router;
