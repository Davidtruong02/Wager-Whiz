const axios = require('axios');
const PlayerData = require('../models/playerData');

const fetchDataFromAWS = async () => {
    try {
        const response = await axios.get('https://t0v8j7tkfe.execute-api.us-east-2.amazonaws.com/beta/data');
        const data = JSON.parse(response.data.body);

        const formattedData = data.map(item => ({
            playerName: item['Player Name'],
            sport: item.Sport,
            category: item.Category,
            line: item.Line,
            typeOfLine: item['Type of Line'],
            position: item.Position.replace(/\\/g, ""), // Remove escaping backslashes
            team: item.Team,
            opponent: item.Opponent,
            usagePercent: item['USG%'],
            minutes: item.Minutes,
            minutesPercentage: item['Min %'],
            projection: item.Projection,
            dvaPositionDefense: item['DVA pos def'],
            imageUrl: item.image_url
        }));

        await PlayerData.insertMany(formattedData);
        console.log("Data successfully fetched and stored.");
    } catch (error) {
        console.error("Error fetching data from AWS:", error);
    }
};


module.exports = { fetchDataFromAWS };
