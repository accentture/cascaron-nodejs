const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express() //creating application of express as a property of Server class
        this.port = process.env.PORT // // process.env.PORT : it serve to use configuration of .env, these are global variables in my Node app

        this.paths = {
            auth:'/api/auth',
            categories:'/api/categories',
            users:'/api/users',
            products:'/api/products',
            search:'/api/search'
        }


        //connect with database
        this.connectDB()

        //middlewares
        this.middlewares()
        
        this.routes()
    }
    async connectDB(){

        //here we can make many connections to different databases
        await dbConnection()
    }
    middlewares(){

        //it is possible to config many middlewares in node.js
        this.app.use( cors() )

        //reading and parsing of body
        this.app.use( express.json() ) //middelware to serializate in json format

        this.app.use( express.static('public'))
    }
    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.categories, require('../routes/categories.routes'))
        this.app.use(this.paths.users, require('../routes/user.routes')) //charging routes of users
        this.app.use(this.paths.products, require('../routes/products.routes')) 
        this.app.use(this.paths.search, require('../routes/search.routes')) 
    }
    listen(){
        this.app.listen( this.port, () => { 
            console.log('Server is running in PORT :', this.port)
        }) 
    }
}

module.exports = Server