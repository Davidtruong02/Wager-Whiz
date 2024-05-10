const express = require("express");
const router = express.Router();
const myPicks = require("../../models/myPicks");
const { PlayerData } = require("../../models");


router.post("/", async (req, res) => {
  const {username, ...playerData} = req.body;
  
});

module.exports = router;
