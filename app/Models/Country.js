"use-strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String},
  currency: { type: String},
  iso: { type: String},
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Country", CountrySchema);