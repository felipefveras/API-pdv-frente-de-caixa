const transportador = require('../config/nodemailer')


const enviarEmail = (to, name) => {
    transportador.sendMail({
        from: process.env.NODEMAILER_EMAIL_FROM,
        to,
        subject: "Pedido feito com sucesso!",
        html: `
            <h2> Ola ${name} </h2>
            <p>Seu pedido foi realizado com sucesso!</p>
        `
    })
}


module.exports = enviarEmail