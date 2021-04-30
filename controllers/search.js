const { response } = require('express')
const { ObjectId } = require('mongoose').Types

const { User, Category, Product } = require('../models')

const collectionAllowed = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async (term = '', res = response ) => {

    //to check if id is valid
    const isMongoID = ObjectId.isValid(term)

    if( isMongoID ){
        const user = await User.findById(term)
        res.json({
            results:(user) ? [user] : []
        })
    }

    //regex to make insensible to uppercase and lowercase
    const regex = new RegExp(term, 'i')

    const users = await User.find({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{ state:true }]
    })
    res.json({
        results:users
    })
}

const searchCategories = async (term = '', res = response ) => {

    //to check if id is valid
    const isMongoID = ObjectId.isValid(term)

    if( isMongoID ){
        const categories = await Category.findById(term)
        res.json({
            results:(categories) ? [categories] : []
        })
    }

    //regex to make insensitive to uppercase and lowercase
    const regex = new RegExp(term, 'i') // 'i' : insensitive

    const categories = await Category.find({ name:regex })
    res.json({
        results:categories
    })
}

const searchProducts = async (term = '', res = response ) => {

    //to check if id is valid
    /* const isMongoID = ObjectId.isValid(term)

    if( isMongoID ){
        const products = await Product.findById(term)
        res.json({
            results:(products) ? [products] : []
        })
    } */

    //regex to make insensible to uppercase and lowercase
    const regex = new RegExp(term, 'i')

    const products = await Product.find({ 
        $or: [{name: regex}, {category: ObjectId(term)}],
        $and: [{ state:true }]
    }).populate('category')
    res.json({
        results:products
    })
}

const search = ( req, res = response ) => {

    const { collection, term }= req.params

    if( !collectionAllowed.includes(collection) ){
        return res.status(400).json({
            msg: `The collections allowed are: ${collectionAllowed}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term , res)
            break;
        case 'categories':
            searchCategories(term, res)
            break;
        case 'products':
            searchProducts(term, res)
            break;
        default:
            res.status(500).json({
                msg:'I forget to build this search'
            })
    }
    //res.json({collection, term})

}


module.exports = {
    search
}




