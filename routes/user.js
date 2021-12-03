"use strict";

const express = require("express");
const api = express.Router();
const {Show,Get,Save,Delete,Update} = require("../app/Controllers/UserController");

//user routes
api.get("/",Show);
api.get("/:id", Get);
api.post("/", Save);
api.put("/delete", Delete);
api.put("/:id", Update);

module.exports = api;