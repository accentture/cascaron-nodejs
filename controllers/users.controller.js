

const { response, request } = require('express')

                        //res = response : allows that vscode knows methods of response
const usersGet = (req = request, res = response) => {
    /* 
        query params are optionals, for that use  "?"
        example of query params in the path:
            http://localhost:8080/api/users?q=hola&name=Jonathan&apiKey=124234
    */
                //name = 'No name' : setting a value by default if name doesn't exist, this feature give flexibility to my code 
    const { q, name = 'No name', apiKey, page = 10, limit } = req.query //getting query params

    //res.send('Hello World')
    //res.json('Hello world') //to return a json
    res.json({
        message:'using GET method - controller',
        q,
        name,
        apiKey,
        page,
        limit
    })
}
const usersPost = (req, res = response) => {

    //the uppack is useful when I want to get only data that I need
    const { name, age } = req.body

    res.json({
        message:'using POST method - controller',
        name,
        age
    })
}
const usersPut = (req, res = response) => {
    //params of url is named params of segment
    //getting params of path

    

    const { id } = req.params

    res.json({
        message:'using PUT method - controller',
        id
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        status:'ok',
        message:'using PATCH method - controller'
    })
}
const usersDelete = (req, res = response) => {
    res.json({
        status:'ok',
        message:'using DELETE method - controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}

