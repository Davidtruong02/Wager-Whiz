const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  sport: { type: String, required: true },
  team: { type: String, required: true },
  logo: { type: String, required: false },
});

const Team = model("Team", teamSchema);

module.exports = Team;
