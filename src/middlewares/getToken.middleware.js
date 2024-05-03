const jwt = require('jsonwebtoken');

const getToken = (req, res, next)=>{
    let token =  req.cookies.jwtCookie;
    jwt.verify(token, 'JWT_SECRET',(err, decoded)=>{
        if(err) return res.status(403).send('Not authorized')
        req.user = decoded;
        next()
    })
}

module.exports = getToken;
