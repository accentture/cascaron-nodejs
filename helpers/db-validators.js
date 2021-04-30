//helpers means functions to help
const Role  = require('../models/role')
const { Category, User, Product } = require('../models')

const isRoleValid = async(role = '') => { //custom() method to make a custom validation 
    //the next is the flow to make a custom validation with express-validator
    const checkRol = await Role.findOne({ role })
    if(!checkRol){
        throw new Error(`The role ${role} is not registered in database`) //throw new Error() stop execution of code
    }
}

const checkExistsEmail = async( email ) => {
    //to check if email exists
    const checkEmail = await User.findOne({email})
    if(checkEmail) {
        throw new Error(`This email ${email} exists already. Use other email. Ugly`)

    }
}

const checkExistsUser = async( id ) => {
    //to check if email exists
    const user = await User.findById(id)
    if(!user) {
        throw new Error(`This id ${id} doesn't exists`)

    }
}

const checkExistsCategory = async( id ) => {
    //to check if email exists
    const category = await Category.findById(id)
    if(!category) {
        throw new Error(`This category ${id} doesn't exists`)
    }
}

const checkStateCategory = async ( id ) => {
    const category = await Category.findById(id)
    if( category && !category.state){
        throw new Error(`This category: ${id} is blocked`)
    }
}


const checkExistsProduct = async( id ) => {

    const category = await Product.findById(id)
    if(!category) {
        throw new Error(`This product ${id} doesn't exists`)
    }
}




module.exports = {
    isRoleValid, 
    checkExistsEmail,
    checkExistsUser,
    checkExistsCategory,
    checkStateCategory,
    checkExistsProduct
}









