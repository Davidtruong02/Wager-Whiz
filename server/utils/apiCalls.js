const axios = require('axios');
const { PlayerData } = require('../models/playerData');

const fetchDataFromAWS = async () => {
    try {
        const response = await axios.get('https://t0v8j7tkfe.execute-api.us-east-2.amazonaws.com/beta/data');
        
        const data = JSON.parse(response.data.body);

        await PlayerData.insertMany(data);

        console.log("Data successfully fetched and stored.");
    } catch (error) {
        console.error("Error fetching data from AWS:", error);
    }
};

module.exports = { fetchDataFromAWS };
