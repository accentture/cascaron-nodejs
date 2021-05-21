

const dbValidators = require('./db-validators')
const generateJWT = require('./generate-jwt')
const googleVerify = require('./google-verify')
const uploadFile = require('./upload-file')

module.exports = {

    //... : to spread all content
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile,
}

