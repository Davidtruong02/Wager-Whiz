const mongoose = require("mongoose");
const models = require("../models");

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await mongoose.connection.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await mongoose.connection.db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
