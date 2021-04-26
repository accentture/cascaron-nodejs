
//mongoose : it is a ODM
//install bcryptjs to encode password
//expres-validator : to validate data, it is a big colleciton of middlewares
//jsonwebtoken : to generate token

require('dotenv').config() //config() : it will take all configuration of .env file
const Server = require('./models/server')


//old configuration
/* const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen( process.env.PORT, () => { // process.env.PORT : it serve to use configuration of .env
    console.log('Server is running in PORT :', process.env.PORT )
})  */

const server = new Server()
server.listen()



