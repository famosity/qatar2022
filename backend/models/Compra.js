const {Schema, model} = require('mongoose');

const CompraSchema = Schema({

    usuario:{
        type: Object,
        required: true
    },
    paquete:{
        type: Object,
        required: true
    },
    estado:{
        type: String,
    }
})
  
module.exports = model('Compra', CompraSchema)