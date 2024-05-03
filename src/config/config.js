const dotenv = require('dotenv');
const { Command } = require('commander');

dotenv.config();

//**COMMANDER */
const program = new Command();
program
    .option('-p,--persistence <persistence>', 'The selected persistence', 'MEMORY')

const options = program.opts();
program.parse(process.argv);

module.exports = {
    mongoConnectionLink: process.env.MONGO_CONNECTION_LINK,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    persistence: options.persistence,
    mailing: {
        service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER, 
            pass: process.env.MAIL_AUTH_PASS
        }
    }
}

