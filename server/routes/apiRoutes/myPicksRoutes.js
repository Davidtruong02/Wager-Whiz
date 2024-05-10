const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MyPicks = require("../../models/myPicks"); // Assuming you have a MyPick model

router.post("/", (req, res) => {
  const { username, ...playerData } = req.body;
  console.log("=========================");
  console.log(req.body);
  console.log("=========================");

  const myPicks = new MyPicks({
    username, // convert username to ObjectId
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

module.exports = router;