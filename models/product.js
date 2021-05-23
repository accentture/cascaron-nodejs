const { Schema, model } = require('mongoose')

//if I create a collection throught Compass, I neew to define fields of documents also in model file
const ProductSchema = Schema({
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
        type:Schema.ObjectId,
        ref:'Usuario',
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    img: {type:String }
})
ProductSchema.methods.toJSON = function(){ 

    var { __v, ...data } = this.toObject() 
    return data
}


module.exports = model('Product', ProductSchema)