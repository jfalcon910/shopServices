"use strict";

const express = require("express");
const api = express.Router();
const {Install,Verify} = require("../app/Controllers/InstalationController");

//auth-routes
api.post("/set", Install);
api.post("/verify", Verify);

module.exports = api;