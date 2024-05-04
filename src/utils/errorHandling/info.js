const getUserErrorInfo = (user)=>{
    return `One or more properties were incomplete or not valid
    List of required properties:
        *first_name: expected String, received ${user.first_name} 
        *last_name: expected String, received ${user.last_name} 
        *email: expected String, received ${user.email} 
        `
}

const getInvalidIdParamInfo = (id)=>{
    return `Se esperaba un paramétro con valor númerico 
        *se recibio: ${id}`
}

const getMissingPropertiesDetails = (propertiesData, bodyObject)=>{ //ej: [{name:string}]
    let output =  `One or more properties were incomplete or not valid
    List of required properties:
        `
    Object.keys(propertiesData).forEach(key => {
       output+=`\n      *${key}: expected ${propertiesData[key]}:, received: ${bodyObject[key]} (${typeof bodyObject[key]})` 
    })
    output+=`\n`;
    return output; 
}

module.exports = {
    getUserErrorInfo,
    getInvalidIdParamInfo,
    getMissingPropertiesDetails
};