const jwt = require("jsonwebtoken");
const Modulos = require("./Modules");

function createToken(user, timeCreation) {
  return new Promise((resolve) => {
    let modules = [];
    const payload = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      timeStamp: timeCreation,
    };

    jwt.sign(payload, process.env.APP_KEY, (error, token) => {
      if (error) {
        resolve({ status: false });
      } else {
        resolve({ status: true, token, payload });
      }
    });
  });
}

function validateToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.APP_KEY, (error, decoded) => {
      // console.log("decoded=",decoded)
      if (!decoded) resolve({ message: "Acceso no autorizado", status: false });
      delete decoded.iat;
      if (error) resolve({ message: "Acceso no autorizado", status: false });
      resolve({
        message: "Acceso correcto",
        status: true,
        userData: decoded,
        token,
      });
    });
  });
}

function base64Decode(data) {
  console.log(data);
  let buff = new Buffer(data, "base64");
  let text = buff.toString("ascii");
  return text;
}

module.exports = {
  createToken,
  validateToken,
  base64Decode,
};
