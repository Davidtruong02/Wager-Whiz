// Sport model

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const sportSchema = new Schema({
  sport: { type: String, required: true },
});

let Sport;
try {
  Sport = mongoose.model("Sport");
} catch (error) {
  Sport = mongoose.model("Sport", sportSchema);
}

module.exports = Sport;
