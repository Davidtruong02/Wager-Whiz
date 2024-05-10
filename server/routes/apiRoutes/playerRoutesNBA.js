const express = require("express");
const router = express.Router();
const NBAPlayerData = require("../../models/NBAplayerData");
const { fetchDataFromAWS } = require("../../utils/apiCalls"); // import the function

router.get("/:sport", async (req, res) => {
  try {
    const sport = req.params.sport;
    console.log("--------------------------------------------");
    console.log(`Sport selected: ${sport}`);
    console.log("--------------------------------------------");
    await fetchDataFromAWS(sport); // call the function with sport as parameter
    const playerData = await NBAPlayerData.find({ sport });
    res.json(playerData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching player data");
  }
});

router.get("/", async (req, res) => {
  try {
    const playerData = await NBAPlayerData.find({});
    if (!playerData) {
      return res.status(404).json({ message: "No players found" });
    }
    res.json(playerData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching player data");
  }
});

module.exports = router;
