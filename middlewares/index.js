//by default in node.js will point to index.js in a folder

const validateFields  = require('../middlewares/validate-fields')
const  validateJWT  = require('../middlewares/validate-jwt')
const  validateRoles = require('../middlewares/validate-roles')
const  validateFile = require('../middlewares/validate-file')

module.exports = {

    //uting spread operator, it will allow to export all files
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile,
}








