const {Schema, model} = require('mongoose');

const CompraSchema = Schema({

    usuario:{
        type: Object,
        require:true
    },
    paquete:{
        type: Object,
        require:true
    },
    estado:{
        type: String,
        require:true
    }
})
  
  module.exports = model('Compra', CompraSchema)