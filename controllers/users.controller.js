
const bcryptjs = require('bcryptjs')
const { response, request } = require('express')

//use uppercase, because User is an instance of a model
const User = require('../models/user')
 

                        //res = response : allows that vscode knows methods of response
const usersGet = async (req = request, res = response) => {
    /* 
        query params are optionals, for that use  "?"
        example of query params in the path:
            http://localhost:8080/api/users?q=hola&name=Jonathan&apiKey=124234
    */
                //name = 'No name' : setting a value by default if name doesn't exist, this feature give flexibility to my code 
    //const { q, name = 'No name', apiKey, page = 10, limit } = req.query //getting query params

    //res.send('Hello World')
    //res.json('Hello world') //to return a json

    
    const { limit = 2, since = 0} = req.query
    const query = {state: true}
    /* const users = await User.find(query) //state: very usefull to simulate register deleted
                            .limit(Number(limit)) //to paginate
                            .skip(Number(since)) //to get users since specific register

    const total = await User.countDocuments(query) */


                //await to wait the promises are solved
                //Promise.all : all promises will be solved simultaneosly
    //destructurating array to set adecuadely value
    const [ total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query) //state: very usefull to simulate register deleted
            .limit(Number(limit)) //to paginate
            .skip(Number(since)) //to get users since specific register

    ])

    res.json({total, users})
}
const usersPost = async (req, res = response) => {
    
    //the unpack is useful when I want to get only data that I need
    const { name, email, password, role } = req.body
    const user = new User({name, email, password, role }) //the model only will save data established as fields in its content
 
    

    //encode password
    const salt = bcryptjs.genSaltSync() //salt is number of turns, if I set more turns more sure will the string encoded, but will take more time, by defautl it is 10
    user.password = bcryptjs.hashSync(password, salt) //encoding password

    //save in db
    //await to wait storign of db
    await user.save()
    res.json({
        message:'using POST method - controller',
        user
    })
}
const usersPut = async(req, res = response) => {
    //params of url is named params of segment
    //getting params of path
    const { id } = req.params
    const { _id, password, google, email, ...remainder } = req.body
    
    if(password){
        const salt = bcryptjs.genSaltSync()
        remainder.password = bcryptjs.hashSync(password, salt)
    }
    
    const user = await User.findByIdAndUpdate( id, remainder, {new:true})

    res.json(user)
}
const usersPatch =  (req, res = response) => {
    res.json({
        status:'ok',
        message:'using PATCH method - controller'
    })
}
const usersDelete = async (req, res = response) => {
    const { id } = req.params
    const userAuthenticated = req.user

    //delete phisically - it is not recommendable because we can lose refential integrity
    //const user = await User.findByIdAndDelete(id)

    //delete updating state - recommendable
    const user = await User.findByIdAndUpdate(id, {state:false}, {new:true})

    res.json({
        user,
        userAuthenticated
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}

