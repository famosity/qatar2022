const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    require: true
  },
  apellido: {
    type: String,
    require: true
  },
  cuit: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  telefono: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('User', UsuarioSchema)