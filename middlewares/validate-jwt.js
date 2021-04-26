const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


const validateJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token') //setting a custom token name

    //check if token exists in header
    if(!token){
        return res.status(400).json({
            msg:'There is not a token in the request'
        })
    }

    //validate token
    try {
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY) //here we can to pick the payload
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)

        if(!user){
            res.status(401).json({ //401 : to authorized to make a specific action
                msg:'It token is not valid - user does not exist in DB'
            })
        }

        if(!user.state){
            res.status(401).json({
                msg:'It token is not valid - user with state:false'
            })
        }
        //req.uid = uid //adiing uid to request
        req.user = user

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token is not valid'
        })
    }
    
    next()
} 



module.exports = {
    validateJWT
}

