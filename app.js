"use strict";

const express = require('express');
const bodyParser = require('body-parser');

//Initialization
const app = express();

//Define prefix routes
const prefixRoutes = process.env.PREFIX_ROUTE;


//routes
const Instalation = require('./routes/instalation');
const Auth = require('./routes/auth');
const Users = require('./routes/user');
// const Country = require('./routes/country');
const Product = require('./routes/product');
const Supplier = require('./routes/supplier');

//Middlewares 
const {verificaToken} = require('./app/Middlewares/Auth');
// app.use(verificaToken);
app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:800000}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Allow", "GET, POST, PUT, DELETE");
  next();
});

app.use(`${prefixRoutes}/instalation`,Instalation);
app.use(`${prefixRoutes}/auth`,Auth);
app.use(`${prefixRoutes}/user`,Users);
// app.use(`${prefixRoutes}/country`,Country);
app.use(`${prefixRoutes}/product`,Product);
app.use(`${prefixRoutes}/supplier`,Supplier);


module.exports = app;