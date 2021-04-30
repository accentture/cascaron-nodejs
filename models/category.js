const { Schema, model } = require('mongoose')

//if I create a collection throught Compass, I neew to define fields of documents also in model file
const CategorySchema = Schema({
    name:{
        type:String,
        required:[true, 'The name is required'], unique:true
    },
    state:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
})
CategorySchema.methods.toJSON = function(){ 

    var { __v, state, ...data } = this.toObject() 
    return data
}


module.exports = model('Category', CategorySchema)