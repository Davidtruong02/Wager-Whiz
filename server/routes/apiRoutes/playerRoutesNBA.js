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

    // Delete all documents in the collection that match the sport
    try {
      await NBAPlayerData.deleteMany({ sport });
      console.log("NBAPlayerData delete successful");
    } catch (error) {
      console.error("Error deleting player data:", error);
    }

    await fetchDataFromAWS(sport); // call the function with sport as parameter

    const playerData = await NBAPlayerData.find({ sport });
    res.json(playerData);
    console.log("----------------------------------------------");
    console.log(playerData);
    console.log("----------------------------------------------");
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
