const mongoose = require("mongoose");

const ecoSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  wallet: { type: Number, default: 0 },
  retirado: { type: Number, default: 0 },
  work: { type: String, default: "No" },
  collect: { type: String, default: "No" },
});

const model = mongoose.model("Economia", ecoSchema);

module.exports = model;
