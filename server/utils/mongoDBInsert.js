// mongoDBInsert.js is a utility function that inserts the NBA and MLB player data into MongoDB
const PlayerData = require("../models/playerData");
const Sport = require("../models/sport");
const Team = require("../models/team");

const insertDataIntoMongoDB = async (jsonData) => {
  try {
    // console.log("jsonData:", jsonData);
    // console.log("jsonData.NBA:", jsonData.NBA);

    // Transform NBA player data
    const nbaPlayers = jsonData.map((player) => ({
      playerName: player["Player Name"],
      sport: player.Sport,
      category: player.Category,
      line: player.Line,
      typeOfLine: player["Type of Line"],
      position: player.Position,
      team: player.Team,
      opponent: player.Opponent,
      usagePercent: player["USG%"],
      minutes: player.Minutes,
      minutesPercentage: player["Min %"],
      projection: player.Projection,
      dvaPositionDefense: player["DVA pos def"],
      imageUrl: player.image_url,
      source: player.Source,
    }));

    // // Transform MLB player data
    // const mlbPlayers = jsonData.map((player) => ({
    //   playerName: player["Player Name"],
    //   sport: player.Sport,
    //   category: player.Category,
    //   line: player.Line,
    //   typeOfLine: player["Type of Line"],
    //   position: player.Position,
    //   team: player.Team,
    //   opponent: player.Opponent,
    //   projection: player.Projection,
    //   imageUrl: player.image_url,
    // }));

    // Insert NBA player data into MongoDB
    await PlayerData.insertMany(nbaPlayers);

    // // Insert MLB player data into MongoDB
    // await PlayerData.insertMany(mlbPlayers);

    console.log("Data successfully inserted into MongoDB");

    await populateSports();
    await populateTeams();
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
  }
};

//Populate the sports
const populateSports = async () => {
  try {
    const distinctSports = await PlayerData.distinct("sport");

    const sportsData = distinctSports.map((sport) => {
      console.log(sport); // log the sport
      return { sport };
    });

    await Sport.insertMany(sportsData);

    console.log("Sports data successfully inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting sports data into MongoDB:", error);
  }
};

populateSports();

// Populate teams data
const populateTeams = async () => {
  try {
    const result = await PlayerData.aggregate([
      {
        $group: {
          _id: "$sport",
          teams: { $addToSet: "$team" },
        },
      },
    ]);

    const teamsData = result.flatMap(({ _id: sport, teams }) =>
      teams.map((team) => {
        console.log(sport, team); // log the team
        return { sport, team };
      })
    );

    await Team.insertMany(teamsData);

    console.log("Teams data successfully inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting teams data into MongoDB:", error);
  }
};

populateTeams();

module.exports = { insertDataIntoMongoDB };
