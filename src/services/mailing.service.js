const nodemailer = require('nodemailer');
const { mailing } = require('../config/config');

const transport = nodemailer.createTransport({
    service: mailing.service,
    port: mailing.port,
    auth:mailing.auth
})

class MailingService {
    async sendRegisterMail(destinationMail){
        await transport.sendMail({
            from: `Coder test <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Registration mail `,
            html: `
                <h1>This is a email for registration</h1>
            `
        })
    }

    async sendPurchaseMail(destinationMail, ticketCode = "1234" ){
        await transport.sendMail({
            from: `Coder test <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Purchase`,
            html: `
                <h1>You just purchased the content of ticket ${ticketCode}</h1>
            `
        })
    }
}

module.exports = MailingService; 