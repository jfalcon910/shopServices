"use-strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    name: {type: String, required: [true, "El nombre es requerido"]},
    phone: {type: String, required: [true, "El número es requerido" ]},
    minimum_amount: {type: Number, default: 0},
    visit_date: {type: String},
    state: { type: Number, default: 1 },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Supplier", SupplierSchema);