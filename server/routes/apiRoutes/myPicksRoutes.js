const express = require("express");
const router = express.Router();
const myPicks = require("../../models/myPicks");

router.post("/myPicks", async (req, res) => {
  try {
    const sport = req.params.sport;
    const myPicks = await myPicks.find({ sport });
    res.json(myPicks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching player data");
  }
});

module.exports = router;
