require('dotenv').config();

"use strict";
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || process.env.PORT;
let provider_db = "";

if (process.env.NODE_ENV == "production") {
  provider_db = `${process.env.DB_CONNECTION_SERVER}://${process.env.BD_USER_SERVER}:${
    process.env.DB_PASSWORD_SERVER
  }@qualify-drlo2.mongodb.net/test?retryWrites=true&w=majority
`;
} else {
  provider_db = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${
    process.env.DB_DATABASE
  }`;
}

// mongoose.connect(provider_db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

try {
  mongoose.connect(provider_db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=>{
    console.log("Conexión a la base de datos exitosa");
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  }).catch(err =>{
    console.log(`No se pudo conectar a la base de datos ${err.message}.`);
  })
} catch (err) {
  console.log(`No se pudo conectar a la base de datos ${err.message}.`);
  process.exit(1);
}


// mongoose.connect(provider_db, (err, res) => {
//   if (err) {
//     return console.log(`No se pudo conectar a la base de datos ${err}.`);
//   }
//   console.log("Conexión a la base de datos exitosa");
//   app.listen(port, () => {
//     console.log(`Servidor iniciado en el puerto ${port}`);
//   });
// });