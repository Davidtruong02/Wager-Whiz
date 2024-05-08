const db = require("../config/connection");
const Team = require("../models/team");
const teamSeeds = require("./teamSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    // await cleanDB('User', 'users');

    // await User.create(userSeeds);

    await cleanDB("Team", "team");
    await Team.create(teamSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
