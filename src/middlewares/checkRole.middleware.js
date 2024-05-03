const checkRole = (role)=>(req, res, next)=>{
    const user = req.user; 

    if(user.role != role){
        return res.status(403).send({status:'error', error:`Unauthorized. You are not a ${role}`})
    }

    next();
}

const checkAdmin = (req, res, next)=>{
    const user = req.user; 

    if(user.role != "admin"){
        return res.status(403).send({status:'error', error:`Unauthorized. You are not a ${role}`})
    }

    next();
}

const checkUser = (req, res, next)=>{
    const user = req.user; 

    if(user.role != "user"){
        return res.status(403).send({status:'error', error:`Unauthorized. You are not a ${role}`})
    }

    next();
}

module.exports = checkRole;