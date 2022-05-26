const express= require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const mongoose =require('mongoose');
const{getEmailAllUser}=require('./controllers/auth');

//crear servidor de express
    const app=express();
//

//configurar la base de datos
    dbConnection()
//

//Lectura y parseo del body
    app.use(express.json());
//

//rutas
    app.use('/api/auth/',require('./routes/auth'));
    app.use('/api/evento/',require('./routes/evento'));
    app.use('/api/estadia/',require('./routes/estadia'));
    app.use('/api/paquete/',require('./routes/paquete'));
    app.use('/api/compra/',require('./routes/compra'));
//

//obtener todos los correos de los usuarios
getEmailAllUser().then(emails=>{
    console.log(emails)
})

//escuchar peticiones 
    
    app.listen(process.env.PUERTO,()=>{
        console.log(`servidor escuchando en el puerto ${process.env.PUERTO}`);
    });
//