//file of model must be done in single

const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is obligatory']
                //true to set as required
                //'Name is obligatory' : setting a message name property doen't exists
    },
    email:{
        type:String,
        required:[true, 'email is obligatory'],
        unique:true // to set as unique
    },
    password:{
        type:String,
        required:[true, 'password is obligatory'],
        
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        default:'USER_ROLE',
        required:[true, 'role is obligatory'],
        //enum:['ADMIN_ROLE', 'USER_ROLE'] //to validate agaisnt an enum
    },
    state:{
        type:Boolean,
        default:true //option by defautl
    },
    google:{
        type:Boolean,
        default:false
    },
    
})

//overriding a method to evit sen password
UserSchema.methods.toJSON = function(){ //important to use normal function or I will lose this keyword

    //voiding to send __v and password
    var { __v, _id, password, ...user } = this.toObject() 
    user.uid = _id
    return user
}

                //using model of mongoose ot set name
                //set name of model in single
module.exports = model('Usuario', UserSchema)

