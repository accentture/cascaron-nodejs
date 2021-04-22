const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express() //creating application of express as a property of Server class
        this.port = process.env.PORT // // process.env.PORT : it serve to use configuration of .env, these are global variables in my Node app

        this.usersPath = '/api/users'

        //middlewares
        this.middlewares()
        
        this.routes()
    }
    middlewares(){

        //it is possible to config many middlewares in node.js
        this.app.use( cors() )

        //reading and parsing of body
        this.app.use( express.json() ) //middelware to serializate in json format

        this.app.use( express.static('public'))
    }
    routes(){
        this.app.use(this.usersPath, require('../routes/user.routes')) //charging routes of users
    }
    listen(){
        this.app.listen( this.port, () => { 
            console.log('Server is running in PORT :', this.port)
        }) 
    }
}

module.exports = Server