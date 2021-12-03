"use strict";
const CONSTANTS = require("../../config/Constants");
const User = require("../Models/User");
const bcrypt = require("bcrypt-nodejs");
const moment = require("moment");
const {FailedReturn,SuccessReturn} = require('../../config/ReturnsRequest');
const { createToken, validateToken } = require("../../config/ServiceToken");

async function SignIn(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  //buscamos si existe el correo en la base de datos
  const existUser = await findUser(email);
  if (!existUser.status)
    return FailedReturn(res,"Error al obtener los datos","El correo ingresado es incorrecto");
  let user = existUser.user;
  //si el usuario existe, obtenemos todos los datos del usuario y validamos si el password ingresado coincide con el de la base de datos
  const checkPass = await checkPassword(password, user.password);
  if (!checkPass)
    return FailedReturn(res,"Error al obtener los datos","El password es incorrecto");
  //creamos una variable con la hora actual
  const timeCreation = moment().unix();
  //creamos el token
  const tokenMake = await createToken(user, timeCreation);
  //validamos si se creó el token
  if (!tokenMake.status)
    return FailedReturn(res,"Error al obtener los datos","Ocurrió un error al generar el token");
  //asignamos el token a la variable token
  let token = tokenMake.token;
  let payload = tokenMake.payload;

  const result = {token,userData:payload,status:true,message:"Acceso correcto"};
  
  //si todo esta ok, procede a dar acceso
  return SuccessReturn(res,result);
}

async function findUser(email) {
  const user = await User.findOne({ email }).exec();
  if (!user) return { status: false };
  return { status: true, user };
}

async function checkPassword(password, storedPass) {
  return new Promise((resolve) => {
    bcrypt.compare(password, storedPass, async (err, response) => {
      if (err) resolve(false);
      if (!response) resolve(false);
      resolve(true);
    });
  });
}

async function Verify(req, res) {
  let token = req.body.token;
  const validate = await validateToken(token);
  return res.status(CONSTANTS.CODE_OK).send(validate);
}

module.exports = {
  SignIn,
  Verify,
};
