
const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
       await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser:true, 
            useUnifiedTopology:true
        });
        console.log('DB conectada');
    }
    catch(error){
        console.log(error);
        throw new Error('error creating connection to Mongoose')
    }
}

module.exports ={
    dbConnection
};