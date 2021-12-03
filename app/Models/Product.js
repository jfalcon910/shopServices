"use-strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: [true, "El nombre es requerido"] },
  price: {type: Number, required:[true,"El precio es requerido"]},
  actualStock: {type:Number, required:[true,"El stock es requerido"]},
  photo: {type: String},
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);