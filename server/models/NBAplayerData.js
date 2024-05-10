// NBAPlayerData model

const { Schema, model } = require("mongoose");

const NBAPlayerDataSchema = new Schema({
  playerName: { type: String, required: true },
  sport: { type: String, required: true, enum: ["MLB", "NBA"] }, // Added enum validation for MLB and NBA
  category: { type: String, required: true },
  line: { type: Number, required: true },
  typeOfLine: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  opponent: { type: String, required: true },
  usagePercent: { type: Number }, // USG%
  minutes: { type: Number }, // Minutes
  minutesPercentage: { type: String }, // Min %
  projection: { type: Number, required: true },
  dvaPositionDefense: { type: String }, // DVA pos def
  imageUrl: { type: String },
  source: { type: String },
});

const NBAPlayerData = model("NBAplayerData", NBAPlayerDataSchema);

module.exports = NBAPlayerData;
