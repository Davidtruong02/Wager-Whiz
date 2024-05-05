const express = require("express");
const router = express.Router();
const PlayerData = require("../models/playerData");

router.get("/playerDatas/:sport", async (req, res) => {
  try {
    const sport = req.params.sport;
    const playerData = await PlayerData.find({ sport });
    res.json(playerData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching player data");
  }
});

module.exports = router;
