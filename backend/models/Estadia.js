const {Schema, model} = require('mongoose');

const EstadiaSchema = Schema({

    name:{
        type: String,
        require:true
    },
    tipo_estadia:{
        type: String,
        require:true
    },
    precio:{
        type: Number,
        require:true
    }
    
})
  
  module.exports = model('Estadia', EstadiaSchema)