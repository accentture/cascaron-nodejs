const jwt = require('jsonwebtoken')

//always will be generated a new json web token in every login
//a token never is saved in database

const generateJWT = (uid = '') => { //uid : user identifier
    return new Promise((resolve, reject) => {

        //the "uid" is the only thing that will be added in the payload
        const payload = { uid }

            // to sign a token
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'1d' // to expire in 4 hours
        }, (err, token) => { //callback
            if(err){
                console.log(err)
                reject('It was impossible to generate the token')
            }else{
                resolve(token)
            }
        }) 


    })
} 



module.exports = {
    generateJWT
}

