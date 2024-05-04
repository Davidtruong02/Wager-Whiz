// mongoDBInsert.js is a utility function that inserts the NBA and MLB player data into MongoDB
const PlayerData = require('../models/playerData');

const insertDataIntoMongoDB = async (jsonData) => {
    try {
        console.log("jsonData:", jsonData);
        console.log("jsonData.NBA:", jsonData.NBA);

        // Transform NBA player data
        const nbaPlayers = jsonData.NBA.map(player => ({
            playerName: player['Player Name'],
            sport: player.Sport,
            category: player.Category,
            line: player.Line,
            typeOfLine: player['Type of Line'],
            position: player.Position,
            team: player.Team,
            opponent: player.Opponent,
            usagePercent: player['USG%'],
            minutes: player.Minutes,
            minutesPercentage: player['Min %'],
            projection: player.Projection,
            dvaPositionDefense: player['DVA pos def'],
            imageUrl: player.image_url
        }));

        // Transform MLB player data
        const mlbPlayers = jsonData.MLB.map(player => ({
            playerName: player['Player Name'],
            sport: player.Sport,
            category: player.Category,
            line: player.Line,
            typeOfLine: player['Type of Line'],
            position: player.Position,
            team: player.Team,
            opponent: player.Opponent,
            projection: player.Projection,
            imageUrl: player.image_url
        }));

        // Insert NBA player data into MongoDB
        await PlayerData.insertMany(nbaPlayers);

        // Insert MLB player data into MongoDB
        await PlayerData.insertMany(mlbPlayers);

        console.log('Data successfully inserted into MongoDB');
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    }
};

module.exports = { insertDataIntoMongoDB };
