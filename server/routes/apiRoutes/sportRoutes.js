const express = require("express");
const router = express.Router();
const Sport = require("../../models/sport");

router.get("/", (req, res) => {
  Sport.find({})
    .then((sports) => {
      res.json(sports);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching sports");
    });
});

module.exports = router;
