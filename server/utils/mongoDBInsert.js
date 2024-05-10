// mongodb insert data
const PlayerData = require("../models/playerData");
const Sport = require("../models/sport");
const Team = require("../models/team");

const insertDataIntoMongoDB = async (jsonData, sport) => {
  // console.log("jsonData:", jsonData);
  try {
    // Parse the JSON string in 'body' to an array
    const data = JSON.parse(jsonData.body);

    // Ensure 'data' is an array and then transform player data based on the sport
    const players = data.map(player => ({
      playerName: player["Player Name"] || 'Unknown Player', // Default to 'Unknown Player' if missing
      sport: player.Sport || sport, // Use the passed sport if missing
      category: player.Category || 'Unknown Category', // Default to 'Unknown Category' if missing
      line: player.Line || 0, // Default to 0 if missing
      typeOfLine: player["Type of Line"] || 'Unknown Type', // Default to 'Unknown Type' if missing
      position: player.Position || 'Not Specified', // Provide default value
      team: player.Team || 'Unknown', // Provide default value
      opponent: player.Opponent || 'Unknown', // Provide default value
      usagePercent: player["USG%"] || null, // Default to null if not available
      minutes: player.Minutes || null, // Default to null if not available
      minutesPercentage: player["Min %"] || null, // Default to null if not available
      projection: player.Projection || 0, // Default to 0 if missing
      dvaPositionDefense: player["DVA pos def"] || 'None', // Default to 'None' if not available
      imageUrl: player.image_url || 'https://static.prizepicks.com/images/players/placeholder.png', // Provide a default image URL
      source: player.Source || 'Unknown Source', // Default to 'Unknown Source' if missing
      start_time: player.start_time || 'Unknown Start Time', // Default to 'Unknown Start Time' if missing
    }));

    // Insert player data into MongoDB
    await PlayerData.insertMany(players);

    // console.log(`${sport} data successfully inserted into MongoDB`);

    // Populate sports and teams
    await populateSports();
    // await populateTeams(sport);
  } catch (error) {
    // console.error(`Error inserting ${sport} data into MongoDB:`, error);
  }
};


// Populate the sports
const populateSports = async () => {
  try {
    const distinctSports = await PlayerData.distinct("sport");

    // Get existing sports from the Sport collection
    const existingSports = await Sport.find({}).select('sport -_id').lean();
    const existingSportsSet = new Set(existingSports.map(s => s.sport));

    // Filter out sports that are already in the database
    const newSportsData = distinctSports.filter(sport => !existingSportsSet.has(sport))
                                        .map(sport => ({ sport }));

    if (newSportsData.length > 0) {
      await Sport.insertMany(newSportsData);
      console.log("New sports data successfully inserted into MongoDB");
    } else {
      console.log("No new sports data to insert.");
    }
  } catch (error) {
    console.error("Error inserting sports data into MongoDB:", error);
  }
};


populateSports();
module.exports = { insertDataIntoMongoDB };
