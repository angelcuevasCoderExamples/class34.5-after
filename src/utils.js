const bcrypt = require('bcrypt');

const hashPassword = (password)=>{
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return hashedPassword;
}

const isValidPassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password)
}


module.exports = {
    hashPassword, 
    isValidPassword
}
