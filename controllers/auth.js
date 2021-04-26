
/* the controllers only are functions */
const { response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {

        //check if user exists
        const user = await User.findOne({ email }) //very important to use await or never I will get a result of query
        if (!user){
            return res.status(400).json({
                msg:'Correo invalid'
            })
        }

        //check if user is active
        if(!user.state){
            return res.status(400).json({
                msg:'User/ password  is not correct - state:false'
            })
        }

        //check password
        const validPassword = bcryptjs.compareSync(password, user.password) //return a boolean
        if(!validPassword){
            return res.status(400).json({
                msg:'User/ password  is not correct - password'
            })
        }

        //generate JWT   
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error in server has ocurred'
        })
    }

    
}

module.exports = {
    login
}


