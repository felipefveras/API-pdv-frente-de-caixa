const nodemailer = require('nodemailer')

const transportador = nodemailer.createTransport({
    host: process.env.NODEMAILER_EMAIL_HOST,
    port: process.env.NODEMAILER_EMAIL_PORT,
    auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASS
    }
})


module.exports = transportador