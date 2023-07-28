const nodemailer = require('nodemailer');
const { prototype } = require('nodemailer/lib/dkim');

class MailService {
    constructor(){
        console.log({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            pool: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            // pool: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }
    async sendActivationMail(to, link){
       await this.transporter.sendMail({
        from: 'process.env.SMTP_USER',
        to,
        subject: 'Активация  учетной записи',
        text: 'That was easy',
        html: `<div><h1>Для активации перейдите по ссылке</h1><a href="${link}">${link}</a></div>`
       }) 
    }
}

module.exports = new MailService();