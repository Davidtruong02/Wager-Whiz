const axios = require("axios");
const { insertDataIntoMongoDB } = require("./mongoDBInsert");

// const fetchDataFromAWS = async () => {
//     try {
//         // Fetch MLB data
//         const mlbResponse = await axios.get('https://c8hvsu5l41.execute-api.us-east-2.amazonaws.com/data/mlb');
//         const mlbData = mlbResponse.data; // No need to parse JSON, axios automatically does it for you
//         // console.log("MLB Data Type:", Array.isArray(mlbData) ? "Array" : typeof mlbData);
//         await insertDataIntoMongoDB(mlbData, 'MLB'); // Insert MLB data into MongoDB
//         console.log("MLB data successfully fetched and stored.");

//         // Fetch NBA data
//         const nbaResponse = await axios.get('https://c8hvsu5l41.execute-api.us-east-2.amazonaws.com/data/nba');
//         const nbaData = nbaResponse.data; // No need to parse JSON, axios automatically does it for you
//         // console.log("NBA Data Type:", Array.isArray(nbaData) ? "Array" : typeof nbaData);
//         await insertDataIntoMongoDB(nbaData, 'NBA'); // Insert NBA data into MongoDB
//         console.log("NBA data successfully fetched and stored.");
//     } catch (error) {
//         console.error("Error fetching data from AWS:", error);
//     }
// };

// module.exports = { fetchDataFromAWS };

const fetchDataFromAWS = async (sport) => {
  try {
    const response = await axios.get(
      `https://c8hvsu5l41.execute-api.us-east-2.amazonaws.com/data/${sport}`
    );
    const data = response.data;
    await insertDataIntoMongoDB(data, sport.toUpperCase());
    console.log(`${sport.toUpperCase()} data successfully fetched and stored.`);
  } catch (error) {
    console.error(`Error fetching data from AWS for ${sport}:`, error);
  }
};

module.exports = { fetchDataFromAWS };
