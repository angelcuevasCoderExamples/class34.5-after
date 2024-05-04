const ErrorTypes = require("./ErrorTypes");

class CustomError extends Error{
    constructor({name="error", cause, message, code=ErrorTypes.UNKOWN}){
        super(message) 
        this.name = name; 
        this.code = code; 
        this.cause = cause;   
    }
}

/***
 * class Error {
 *   constructor(message){
 *       //does stuff
 *   }
 * }
 */
//new Error('message')

module.exports = CustomError; 