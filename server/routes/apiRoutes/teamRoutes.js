const express = require("express");
const router = express.Router();
const Team = require("../../models/team");

router.get("/:sport/:team", (req, res) => {
  const { sport, team } = req.params;

  Team.findOne({ sport, team })
    .then((teams) => {
      console.log("============================");
      console.log(teams);
      console.log("============================");
      if (teams) {
        res.json({ logoUrl: teams.logoUrl });
      } else {
        res
          .status(404)
          .send(`Team not found for sport: ${sport} and team: ${team}`);
      }
    })
    .catch((err) => {
      console.error(
        `Error fetching team for sport: ${sport} and team: ${team}`,
        err
      );
      res.status(500).send("Error fetching team");
    });
});

module.exports = router;
