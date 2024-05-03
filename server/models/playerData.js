const { Schema, model } = require('mongoose');

const playerDataSchema = new Schema({
    PlayerName: { type: String, required: true },
    Sport: { type: String, required: true },
    Category: { type: String, required: true },
    Line: { type: Number, required: true },
    TypeOfLine: { type: String, required: true },
    Position: { type: String, required: true },
    Team: { type: String, required: true },
    Opponent: { type: String, required: true },
    USG: { type: Number },
    Minutes: { type: Number },
    MinPercentage: { type: String },
    Projection: { type: Number },
    DVAPosDef: { type: String },
    ImageURL: { type: String },
});

const PlayerData = model('PlayerData', playerDataSchema);

module.exports = PlayerData;
