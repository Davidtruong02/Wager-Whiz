const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  sport: { type: String, required: true },
  team: { type: String, required: true },
});

const Team = model("Team", teamSchema);

module.exports = Team;
