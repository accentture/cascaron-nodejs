
/* the controllers only are functions */
const { response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        //check if user exists
        const user = await User.findOne({ email }) //very important to use await or never I will get a result of query
        if (!user) {
            return res.status(400).json({
                msg: 'Correo invalid'
            })
        }

        //check if user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'User/ password  is not correct - state:false'
            })
        }

        //check password
        const validPassword = bcryptjs.compareSync(password, user.password) //return a boolean
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/ password  is not correct - password'
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

const googleSigin = async (req, res = response) => {

    const { id_token } = req.body
     
    try {
        const { name, email, img } = await googleVerify(id_token)
        const user = await User.findOne({email})
        
        if(!user){
            
            //create user
            const data = {
                name,
                email,
                password:':p',
                img,
                google:true
            }
            user = new User(data)
            await user.save()

        }

        //check if user has state: false
        if( !user.state ){
            return res.status(401).json({
                msg:'Speak with the manager of server, user bloqued'
            })
        }

        const token = await generateJWT(user.id)
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'The token of google is not valid'
            
        })
    }

}


module.exports = {
    login,
    googleSigin
}


