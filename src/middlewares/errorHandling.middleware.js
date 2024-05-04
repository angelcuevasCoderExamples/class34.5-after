const ErrorTypes = require("../utils/errorHandling/ErrorTypes");

const errorHandling = (error, req, res, next)=>{
   
    let time = new Date().toLocaleString()
    switch (error.code) {
        case ErrorTypes.INVALID_TYPE_ERROR:
            req.logger.warning(error.cause)
            res.status(400).send({status:'error', error: error.name, time})
            break;
        case ErrorTypes.INVALID_PARAM:
            req.logger.warning(error.cause)
            res.status(400).send({status:'error', error: error.name, time})
            break;
        
        default:
            req.logger.fatal(error.cause)
            res.status(500).send({status:'error', error: 'Unhadled error'})
            break;
    } 
}

module.exports = errorHandling;