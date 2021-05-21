const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

//to uplod files
const  fileUpload  = require('express-fileupload') //no unpack because it can return undefined

class Server {
    constructor(){
        this.app = express() //creating application of express as a property of Server class
        this.port = process.env.PORT // // process.env.PORT : it serve to use configuration of .env, these are global variables in my Node app

        this.paths = {
            auth:'/api/auth',
            categories:'/api/categories',
            users:'/api/users',
            products:'/api/products',
            search:'/api/search',
            uploads:'/api/uploads',
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

        //middleware to upload files
        this.app.use( fileUpload({
            
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //to create a folder if this doesn't exist
        }));
    }
    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.categories, require('../routes/categories.routes'))
        this.app.use(this.paths.users, require('../routes/user.routes')) //charging routes of users
        this.app.use(this.paths.products, require('../routes/products.routes')) 
        this.app.use(this.paths.search, require('../routes/search.routes')) 
        this.app.use(this.paths.uploads, require('../routes/uploads.routes')) 
    }
    listen(){
        this.app.listen( this.port, () => { 
            console.log('Server is running in PORT :', this.port)
        }) 
    }
}

module.exports = Server