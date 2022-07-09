const {Schema, model} = require('mongoose');

const CompraSchema = Schema({

    usuario:{
        name: {
            type: String,
            require: true
        },
        apellido: {
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
    },
    paquete:{
        seguro:{
            type: Object,
            require:true
        },
        partido:{
            type: Object,
            require:true
        },
        hotel:{
            type: Object,
            require:true
        },
        transporte:{
            type: Object,
            require:true
        },
    },
    precio:{
        type: Number,
        require:true
    },
    estado:{
        type: String,
    }
})
  
module.exports = model('Compra', CompraSchema)