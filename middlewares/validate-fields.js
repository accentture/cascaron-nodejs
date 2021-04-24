const { validationResult } = require('express-validator')

//when the path arrive to a middlware, reimainder middleware are not executed

const validateFields = (req, res, next ) => {
    const errors = validationResult(req) //to pass req as param
    if(!errors.isEmpty()){ //checkign if exists errors
        res.status(400).json(errors)
    }
    next() //to continue with the next middlware or controller
}

module.exports = {
    validateFields 
}