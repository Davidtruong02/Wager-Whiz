const { Schema, model } = require('mongoose');

const playerDataSchema = new Schema({
    playerName: { type: String, required: true },
    sport: { type: String, required: true },
    category: { type: String, required: true },
    line: { type: Number, required: true },
    typeOfLine: { type: String, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
    opponent: { type: String, required: true },
    usagePercent: { type: Number }, // USG%
    minutes: { type: Number, required: true },
    minutesPercentage: { type: String }, // Min %
    projection: { type: Number, required: true },
    dvaPositionDefense: { type: String }, // DVA pos def
    imageUrl: { type: String }
});

const PlayerData = model('PlayerData', playerDataSchema);

module.exports = PlayerData;
