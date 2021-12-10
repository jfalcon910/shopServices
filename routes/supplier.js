"use strict";

const express = require("express");
const api = express.Router();
const {Show,Get,Save,Delete,Update} = require("../app/Controllers/SupplierController");

//user routes
api.get("/", Show);
api.get("/:id", Get);
api.post("/", Save);
api.put("/delete/:id", Delete);
api.put("/:id", Update);

module.exports = api;