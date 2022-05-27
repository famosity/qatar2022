const express= require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const mongoose =require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
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
const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
    },
});
cron.schedule('59 0 * * *', () => {
    getEmailAllUser().then(emailsAll => {
        emailsAll.forEach(e => {
            console.log(e)
            const mailOptions = {
                from: 'vazquezmartinnahuel@gmail.com', // sender address
                to: e, // list of receivers
                subject: "Te llevamos al mundial", // Subject line
                text: "Variedad de precios",
                // image:true,
                // attachments: [
                //     {
                //         filename: 'logo.png',
                //         path: './public/img/logo.png',
                //         cid: 'logo'
                //     }
                // ],
                html: '<b>Vive el Mundial con Messi</b>' // html body
            };
            
            
            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email send: '+info.response)
                }
            });
        });
    });
})


//escuchar peticiones 
    
    app.listen(process.env.PUERTO,()=>{
        console.log(`servidor escuchando en el puerto ${process.env.PUERTO}`);
    });
//