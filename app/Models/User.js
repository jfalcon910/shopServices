"use-strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  name: { type: String, required: [true, "El nombre es requerido"] },
  lastName: { type: String, required: [true, "El apellido es requerido"] },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "El correo es requerido"]
  },
  password: { type: String, required: [true, "La contraseña es requerida"] },
  state: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});

UserSchema.pre("save", function(next) {
  let usuario = this;
  if (!usuario.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if (err) return next(err);
      usuario.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);