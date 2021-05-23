const { validationResult } = require('express-validator')

//when the path arrive to a middlware, reimainder middleware are not executed

const validateFile = (req, res, next ) => {

    //checking if exists properties in the request
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msj: 'There are not files in the request' });
    }
    next() //to continue with the next middlware or controller
}

module.exports = {
    validateFile 
}