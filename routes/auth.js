"use strict";

const express = require("express");
const api = express.Router();
const {SignIn,Verify} = require("../app/Controllers/AuthController");

//auth-routes
api.post("/auth-login", SignIn);
api.post("/verify-auth", Verify);

module.exports = api;