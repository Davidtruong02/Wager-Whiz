const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MyPicks = require("../../models/myPicks"); // Assuming you have a MyPick model

router.post("/", (req, res) => {
  const { username, _id, ...playerData } = req.body;
  const myPicks = new MyPicks({
    _id,
    username,
    ...playerData,
  });

  myPicks
    .save()
    .then(() => res.json("Player added to my picks!"))
    .catch((err) => {
      console.log("=========================");
      console.log(err); // Log the error
      console.log("=========================");
      res.status(400).json("Error: " + err);
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  MyPicks.find({ username })
    .then((players) => res.json(players))
    .catch((err) => {
      console.log("=========================");
      console.log(err); // Log the error
      console.log("=========================");
      res.status(400).json("Error: " + err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  MyPicks.findByIdAndDelete(id)
    .then(() => res.json("Player deleted from my picks!"))
    .catch((err) => {
      console.log("=========================");
      console.log(err); // Log the error
      console.log("=========================");
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
