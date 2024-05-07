// apiCalls.js contains the function fetchDataFromAWS that fetches data from the AWS API and processes it.

const axios = require('axios');
const { insertDataIntoMongoDB } = require('./mongoDBInsert');

const fetchDataFromAWS = async () => {
    try {
        const response = await axios.get('https://t0v8j7tkfe.execute-api.us-east-2.amazonaws.com/beta/data');
        const jsonData = JSON.parse(response.data.body); // Parse the JSON data from the body property
        // console.log("Data fetched from AWS:", jsonData);

        await insertDataIntoMongoDB(jsonData); // Insert data into MongoDB

        console.log("Data successfully fetched and stored.");
    } catch (error) {
        console.error("Error fetching data from AWS:", error);
    }
};

module.exports = { fetchDataFromAWS };
