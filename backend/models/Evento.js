const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    name:{
        type: String,
        require:true
    },
    precio:{
        type: Number,
        require:true
    }
})
  
  module.exports = model('Evento', EventoSchema)