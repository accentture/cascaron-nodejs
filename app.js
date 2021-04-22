
//express dotenv : this lybrary serves to configurate envrionment variables
//install CORS: to access crossed between appss

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



