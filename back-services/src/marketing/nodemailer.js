import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { getEmailAllUser } from '../services/mailing.js';

export const mailer = ()=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });
    cron.schedule('1 43 17 * * 1,2,4,5', () => {
        getEmailAllUser().then(emailsAll => {
            emailsAll.forEach(e => {
                
                const mailOptions = {
                    from: 'vazquezmartinnahuel@gmail.com', // sender address
                    to: e, // list of receivers
                    subject: "Viví el mundial junto a Messi", // Subject line
                    text: "Variedad de precios",
                    html: '<img src="https://i.pinimg.com/564x/ab/8a/50/ab8a50a82654ddedb02e13fb9a0d5c24.jpg"  alt="...">' 
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
}
