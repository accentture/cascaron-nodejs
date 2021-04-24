const mongoose = require('mongoose')

const dbConnection = async () => { //using asinchronous function

    //it is recommendable to use try catch when I will try to connect with database
    try {
        //connection with database
        //await to wait connection with database
        //using url established in environments
        await mongoose.connect(process.env.MONGODB_ATLAS, { //this method return a promise
            //to check documentation to understand the next values
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false //recomendable to use specific funtions
        })
        console.log('Connection with database was done successly!!!')


    } catch (err) {



        //usefull to see error throught console
        console.log(err)
        throw new Error('Error trying connect with database')
    }
}




module.exports = {
    dbConnection
}