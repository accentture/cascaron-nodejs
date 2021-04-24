const { Schema, model } = require('mongoose')

//if I create a collection throught Compass, I neew to define fields of documents also in model file
const RoleSchema = Schema({
    role:{
        type:String,
        required:[true, 'El rol es obligatorio']
    }
})



module.exports = model('Role', RoleSchema)