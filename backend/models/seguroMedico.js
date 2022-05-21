const {Schema, model} = require('mongoose');

const SeguroSchema = Schema({

    "name":{
        type: String,
        require:true
    },
    "asistencia":{
        type: String,
        require:true
    },
    "hoteleria":{
        type: String,
        require:true
    },
    "reinegro":{
        type: String,
        require:true
    }

})  
module.exports = model('Seguro',SeguroSchema)