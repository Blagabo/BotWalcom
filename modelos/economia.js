const mongoose = require("mongoose");

const ecoSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  wallet: { type: Number, default: 0 },
  retirado: { type: Number, default: 0 },
});

const model = mongoose.model("Economia", ecoSchema);

module.exports = model;
